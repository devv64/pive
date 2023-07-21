from django.shortcuts import render
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
# Create your views here.
@api_view(['GET'])
def get_all(request):
    products = Product.objects.all()
    data = ProductSerializer(products, many=True).data
    return Response(data)


