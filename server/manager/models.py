from django.db import models
from django.contrib.auth.models import User
from stores.models import Store

# Create your models here.
class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    store = models.OneToOneField(Store, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=30)
    