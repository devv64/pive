import json
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import *
import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET")
# Create your views here.
@api_view(['POST'])
def create_checkout_session(request):

    DOMAIN = "http://localhost:3000/checkout"
    try: 
        checkout_session = stripe.checkout.Session.create(
            line_items = json.loads(request.body),
            mode='payment',
            success_url= DOMAIN + "?success=true",
            cancel_url=DOMAIN + "?canceled=true" 
        )
    except Exception as e:
        print(str(e))
        return Response({"error":"stripe internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    print(checkout_session.url)
    return redirect(checkout_session.url)

#TODO: ADD AUTH VERIFICATION 
@api_view(['POST'])
def create_order(request):
    data = json.loads(request.body)
    serializer = OrderSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
    return Response(status=status.HTTP_201_CREATED)
    