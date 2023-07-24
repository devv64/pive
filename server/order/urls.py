from django.urls import include, path
from . import views

urlpatterns = [
    path("stripe_session", views.create_checkout_session),
    path("new_order", views.create_order)
]