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
    featured = models.BooleanField(default=False)

class Product(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE, related_name="products")
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
        
class ProductStoreInfoSerializer(serializers.ModelSerializer):
    store = StoreSerializer(read_only=True)
    class Meta:
        model = ProductStoreInfo
        fields = ["store", "price", "stock"]

class ProductSerializer(serializers.ModelSerializer):
    carrying_stores = ProductStoreInfoSerializer(source="productstoreinfo_set",many=True, read_only=True)
    drink_name = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "drink_name", "size", "image_url", "carrying_stores"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["carrying_stores"] = sorted(
            representation["carrying_stores"], key=lambda x: x["price"], reverse=False
        )
        return representation
    
    def get_drink_name(self, instance):
        return instance.drink.name if instance.drink else None

class DrinkSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Drink
        fields = ["name", "description", "products"]


class CarouselDrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ["id", "name"]

    # TODO: some error handling here wouldnt hurt
    # TODO: also consider a lightweight product serializer to simplify
    def to_representation(self, instance): 
        rep = super().to_representation(instance)
        first_prod = Product.objects.filter(drink=instance).first()
        first_prod_price = ProductStoreInfo.objects.filter(product=first_prod).order_by("-price").first().price
        rep["product"] = {
            "size":first_prod.size,
            "image_url":first_prod.image_url,
            "price": first_prod_price,
        }
        return rep
