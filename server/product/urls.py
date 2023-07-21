from django.urls import include, path
from . import views

urlpatterns = [
    path("all", views.get_all),
    path("<int:id>", views.get_by_id),
    path("category/<str:category>", views.get_by_category),
    path("featured", views.get_featured),
    path("create", views.create),
]