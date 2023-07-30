from django.db import models
from rest_framework import serializers
from product.models import Product, ProductSerializer
from stores.models import Store, StoreSerializer

# Create your models here.
class Order(models.Model):
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=50)
    status = models.CharField(max_length=10)
    ordered_at = models.DateTimeField()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="order_items", on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE) 
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product_id", "store_id", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True) 
    class Meta:
        model = Order
        fields = ["order_items", "address", "contact", "status", "ordered_at"]

    def create(self, validated_data):
        print(validated_data)
        order_items = validated_data.pop("order_items")
        order = Order.objects.create(**validated_data)
        for order_item_data in order_items:
            OrderItem.objects.create(order=order, **order_item_data)
        return order

