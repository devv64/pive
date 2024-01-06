from datetime import datetime
import time
from django.db import models
from rest_framework import serializers
from product.models import Product, ProductStoreInfo
from stores.models import Store, StoreSerializer
from django.core.exceptions import ObjectDoesNotExist
import uuid
# Create your models here.

STATUS_CHOICES = [("a", "Awaiting Payment"), ("p","Pending"), ("o","Out for Delivery"), ("d","Delivered"), ("c","Canceled")]
class Order(models.Model):
    name = models.CharField(max_length=100)
    uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    store = models.ForeignKey(Store, models.CASCADE)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="a", choices=STATUS_CHOICES)
    ordered_at = models.DateTimeField(null=True)

    def confirm_payed_order(self):
        self.status = "p"
        self.ordered_at = datetime.now()
        self.save()
        items = self.order_items.all()
        for item in items:
            storeinfo = ProductStoreInfo.objects.get(store=self.store, product=item.product_id)
            # print(storeinfo.stock)
            storeinfo.stock -= item.quantity
            storeinfo.save()
            # print(storeinfo.stock)
    
    def update_status(self, new_status):
        self.status = new_status
        if new_status == "p":
            self.ordered_at = datetime.now()
            items = self.order_items.all()
            for item in items:
                storeinfo = ProductStoreInfo.objects.get(store=self.store, product=item.product_id)
                print(storeinfo.stock)
                storeinfo.stock -= item.quantity
                storeinfo.save()
                print(storeinfo.stock)
        elif new_status == "c":
            items = self.order_items.all()
            for item in items:
                storeinfo = ProductStoreInfo.objects.get(store=self.store, product=item.product_id)
                storeinfo.stock += item.quantity
                storeinfo.save()
        self.save()   
    

    def set_expired(self):
        self.status="Expired"
        self.save()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="order_items", on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE) 
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.IntegerField()


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product_id", "name", "image","price", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    store = serializers.PrimaryKeyRelatedField(queryset=Store.objects.all()) 
    class Meta:
        model = Order
        fields = ["order_items", "store","name", "address", "email", "phone"]

    def create(self, validated_data):
        try:
            order_items = validated_data.pop("order_items")
            order = Order.objects.create(**validated_data)
            for order_item_data in order_items:
                OrderItem.objects.create(order=order, **order_item_data)
        except serializers.ValidationError as e:
            raise e
        return order
    
    def validate(self, data):
        try:
            for order_item in data['order_items']:
                storeinfo = ProductStoreInfo.objects.get(store=data['store'], product=order_item['product_id'])
                if order_item['quantity'] > storeinfo.stock:
                    raise serializers.ValidationError(
                        {
                            "quantity":"Not enough stock", 
                            "product_id": order_item['product_id'],
                            "store_id": data['store'],
                            "available_stock":storeinfo.stock
                        })
        except ObjectDoesNotExist:
            raise serializers.ValidationError({"Store does not have product"})
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["store"] = StoreSerializer(instance=Store.objects.get(pk=representation["store"])).data
        return representation
                