from django.db import models
from stores.models import Store, StoreSerializer
from rest_framework import serializers

# Create your models here.
class Drink(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Product(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    size = models.CharField(max_length=30)
    image_url = models.CharField(max_length=300) #change to imagefield
    stores = models.ManyToManyField(Store) # implement "through" class for store possession of product

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ["name", "description"]

class ProductSerializer(serializers.ModelSerializer):
    drink = DrinkSerializer(read_only=True)
    stores = StoreSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ["drink", "size", "image_url", "stores"]
    