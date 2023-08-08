from django.urls import include, path
from . import views

urlpatterns = [
    path("active", views.active, name='active'),
    path("login", views.loginPage, name='login'),
    path("logout", views.logoutUser, name="logout")
]