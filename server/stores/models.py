from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User

# Create your models here.
class Store(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    available = models.BooleanField()

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ["name", "location", "available"]
    
    def create(self, validated_data):
        store = Store.objects.create(**validated_data)
        

    