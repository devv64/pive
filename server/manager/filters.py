import django_filters
from django_filters import CharFilter
from product.models import Drink

class DrinkFilter(django_filters.FilterSet):
    name = CharFilter(field_name="name", label='Search', lookup_expr='icontains')
    class Meta:
        model = Drink
        fields = ["name"]

