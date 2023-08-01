from django.db import models
from rest_framework import serializers
from product.models import Product, ProductStoreInfo
from stores.models import Store, StoreSerializer
from django.core.exceptions import ObjectDoesNotExist

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

    def save(self, *args, **kwargs):
        storeinfo = ProductStoreInfo.objects.get(store=self.store_id, product=self.product_id)
        storeinfo.stock -= self.quantity
        storeinfo.save()
        super(OrderItem, self).save(*args, **kwargs)

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product_id", "store_id", "quantity"]

    def validate(self, data):
        '''
        #! product id gotta be legit
        #! check again that the store can deliver to that location
        store must have stock
        '''
        print(data)
        # try:
        #     Product.objects.get(pk=data['product_id'])
        # except ObjectDoesNotExist:
        #     raise serializers.ValidationError({"product_id":"invalid product id"})
        
        # try:
        #     Store.objects.get(pk=data['store_id'])
        # except ObjectDoesNotExist:
        #     raise serializers.ValidationError({"store_id":"invalid store id"})
        
        try:
            storeinfo = ProductStoreInfo.objects.get(store=data['store_id'], product=data['product_id'])
            print(storeinfo.stock)
            if data['quantity'] > storeinfo.stock:
                raise serializers.ValidationError(
                    {
                        "quantity":"Not enough stock", 
                        "product_id": data['product_id'],
                        "store_id": data['store_id'],
                        "available_stock":storeinfo.stock
                     })
        except ObjectDoesNotExist:
            raise serializers.ValidationError({"Store does not have product"})
        return data

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True) 
    class Meta:
        model = Order
        fields = ["order_items", "address", "contact", "status", "ordered_at"]

    def create(self, validated_data):
        try:
            order_items = validated_data.pop("order_items")
            order = Order.objects.create(**validated_data)
            for order_item_data in order_items:
                OrderItem.objects.create(order=order, **order_item_data)
        except serializers.ValidationError as e:
            raise e
        return order
