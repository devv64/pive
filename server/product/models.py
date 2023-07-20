from django.db import models
from stores.models import Store, StoreSerializer
from rest_framework import serializers
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.
class Category(MPTTModel):
    name = models.CharField(max_length=15, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,related_name='children')

class Drink(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = TreeForeignKey(Category, null=True, on_delete=models.SET_NULL)

class Product(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    size = models.CharField(max_length=30)
    image_url = models.CharField(max_length=300) #change to imagefield
    stores = models.ManyToManyField(Store, through="ProductStoreInfo") # implement "through" class for store possession of product

class ProductStoreInfo(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()


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

class ProductStoreInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductStoreInfo
        fields = ["price", "stock"]