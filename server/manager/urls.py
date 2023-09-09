from django.urls import include, path
from . import views

urlpatterns = [
    path("active", views.active, name='active'),
    path("login", views.loginPage, name='login'),
    path("logout", views.logoutUser, name="logout"),
    path("order/<str:f>/<uuid:uuid>", views.order_page, name="order"),
    path("all", views.all, name='all'), 
    path("inventory", views.inventory_page, name='inventory'), 
    path("drink/<int:id>", views.drink_page, name='drink'),
    path("add-product/<int:product_id>", views.add_size, name='add-size'),
    path("size-product/<int:product_id>", views.edit_size, name='edit-size'),
    path("delete-product-hidden/<int:product_id>", views.delete_size, name='delete-size'),
    path("contact", views.contact_page, name="contact")
]