from django.urls import include, path
from . import views

urlpatterns = [
    path("all", views.get_all),

    path("<int:id>", views.get_drink_by_id),
    path("featured_carousel", views.get_featured_drinks),


    path("category/<str:category>", views.get_by_category),
    path("featured", views.get_featured),
    path("create", views.create),
]