from django.urls import include, path
from . import views

urlpatterns = [
    path("nearby-stores/", views.getAvailableStores)
]