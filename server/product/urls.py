from django.urls import include, path
from . import views

urlpatterns = [
    path("all", views.get_all),

    path("<int:id>", views.get_drink_by_id),
    path("featured_carousel", views.get_carousel_featured_drinks),
    path("category/<str:category>", views.get_carousel_drinks_by_category),

    path("create", views.create),
]