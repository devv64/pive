from django.db import models
from stores.models import Store, StoreSerializer
from rest_framework import serializers
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.
class Category(MPTTModel):
    name = models.CharField(max_length=15, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

class Drink(models.Model):
    category = TreeForeignKey(Category, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    description = models.TextField()

class Product(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    size = models.CharField(max_length=30)
    image_url = models.CharField(max_length=300) 
    featured = models.BooleanField(default=False)
    stores = models.ManyToManyField(Store, through="ProductStoreInfo")

class ProductStoreInfo(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]

class DrinkSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Drink
        fields = ["name", "description", "category"]
        
class ProductStoreInfoSerializer(serializers.ModelSerializer):
    store = StoreSerializer(read_only=True)
    class Meta:
        model = ProductStoreInfo
        fields = ["store", "price", "stock"]

class ProductSerializer(serializers.ModelSerializer):
    drink = DrinkSerializer(read_only=True)
    productstoreinfo_set = ProductStoreInfoSerializer(read_only=True, many=True)
    class Meta:
        model = Product
        fields = ["id", "drink", "size", "image_url", "productstoreinfo_set"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["productstoreinfo_set"] = sorted(
            representation["productstoreinfo_set"], key=lambda x: x["price"], reverse=False
        )
        return representation
