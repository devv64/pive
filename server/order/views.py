import json
import time
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET")

#! throw this shit in an env variable
endpoint_secret = os.getenv("ENDPOINT_SECRET")
# Create your views here.
@api_view(['POST'])
def create_checkout_session(request):
    '''
    create order object, check 
    create line items json for stripe session
    pass id of newly created order object into metadata, check
    '''
    data = json.loads(request.body)
    serializer = OrderSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
    except serializers.ValidationError as e:
        return Response(e.detail, status=status.HTTP_418_IM_A_TEAPOT)
    
    line_items_data = reformat_for_stripe(data)
    print(order.id)

    DOMAIN = "http://localhost:3000"
    try: 
        checkout_session = stripe.checkout.Session.create(
            line_items = line_items_data,
            mode='payment',
            success_url= DOMAIN + "/order-confirmation?success=true&order_id=" + str(order.uuid),
            cancel_url=DOMAIN + "/checkout?canceled=true",
            expires_at = (int(time.time()) + 1800),
            metadata = {"order_id":order.id}
        )
        print(checkout_session.metadata)
    except Exception as e:
        print(str(e))
        return Response({"error":"stripe internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    print(checkout_session.url)
    return JsonResponse({'id': checkout_session.id})

def reformat_for_stripe(data):
    line_item_data = []
    for item in data['order_items']:
        line_item_data.append({
            "price_data": {
                "currency": "usd",
                "unit_amount": int(item['price'] * 100),
                "product_data": {
                    "name": item['name'],
                    "images": [item['image']]
                }
            },
            "quantity": item['quantity']
        })
    return line_item_data

#TODO: ADD AUTH VERIFICATION 
@api_view(['POST'])
def create_order(request):
    data = json.loads(request.body)
    serializer = OrderSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except serializers.ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_201_CREATED)

@csrf_exempt
def stripe_payment_webhook(request):
    print("webhook called")
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
        payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)
    print(event['type'])
    if event['type'] == "checkout.session.completed":
        order = Order.objects.get(pk=event['data']['object']['metadata']['order_id'])
        order.confirm_payed_order()
    elif event['type'] == "checkout.session.expired":
        order = Order.objects.get(pk=event['data']['object']['metadata']['order_id'])
        order.set_expired()

    return HttpResponse(status=200)
    
@api_view(['GET'])
def get_order_by_uuid(request, uuid):
    order = Order.objects.get(uuid=uuid)
    return Response(OrderSerializer(instance=order).data)