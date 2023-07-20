from django.db import models
from rest_framework import serializers
from product.models import Product, ProductSerializer

# Create your models here.
class Order(models.Model):
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=50)
    status = models.CharField(max_length=10)
    ordered_at = models.DateTimeField()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="order_items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ["product", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True) #order items print all stores that hold that product, will probably need to chang this
    class Meta:
        model = Order
        fields = ["order_items", "address", "contact", "status", "ordered_at"]

