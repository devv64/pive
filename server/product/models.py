from django.db import models
from stores.models import Store

# Create your models here.
class Drink(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Product(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    size = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image_url = models.CharField(max_length=300)
    stores = models.ManyToManyField(Store)
    