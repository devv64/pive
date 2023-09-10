from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User

# Create your models here.
class Store(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    delivery_distance = models.IntegerField(null=False)
    available = models.BooleanField()

    def __str__(self) -> str:
        return self.name

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ["id","name", "location", "available"]

        

    