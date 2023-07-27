from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.postgres.search import TrigramWordSimilarity, TrigramSimilarity
from django.db.models import Q
from .models import *
# Create your views here.

@api_view(['POST'])
def create(request):
    data = request.data

    # Deserialize Drink data
    drink_data = data.get('drink', {})
    category_data = drink_data.pop('category', {})
    category_name = category_data.get('name')

    # Create or get the Category object
    category, _ = Category.objects.get_or_create(name=category_name)

    # Create the Drink object
    drink = Drink.objects.create(category=category, **drink_data)

    # Deserialize Stores data
    stores_data = data.get('stores', [])

    # Create or update Store objects and associated ProductStoreInfo
    for store_data in stores_data:
        store_name = store_data.get('name')
        store, _ = Store.objects.get_or_create(name=store_name, location = store_data['location'], available=store_data['available'])
        product_store_info_data = {
            'store': store,
            'price': store_data.get('price', 0),
            'stock': store_data.get('stock', 0)
        }
        # Note: We do not create ProductStoreInfo here.

    # Deserialize Product data
    product_data = {
        'drink': drink,
        'size': data.get('size', ''),
        'image_url': data.get('image_url', ''),
        'featured': data.get('featured', False)
    }

    # Create the Product object
    product = Product.objects.create(**product_data)

    # Create ProductStoreInfo objects and associate them with the created Product
    for store_data in stores_data:
        store_name = store_data.get('name')
        store = Store.objects.get(name=store_name)
        product_store_info_data = {
            'store': store,
            'price': store_data.get('price', 0),
            'stock': store_data.get('stock', 0)
        }
        ProductStoreInfo.objects.create(product=product, **product_store_info_data)

    # Serialize the created Product and return its data in the response
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_all(request):
    products = Product.objects.all()
    data = ProductSerializer(products, many=True).data
    return Response(data)

@api_view(['GET'])
def get_by_id(request, id):
    product = Product.objects.get(id=id)
    data = ProductSerializer(product).data

    # Get other products with the same product.drink.name but other product.size
    other_products = Product.objects.filter(
        drink__name=product.drink.name, size__neq=product.size
    )

    data["other_products"] = ProductSerializer(other_products, many=True).data

    return Response(data)

@api_view(['GET'])
def get_carousel_drinks_by_category(request, category):
    try:
        categories = Category.objects.get(name=category).get_descendants()
        drinks = Drink.objects.filter(category__in=categories)
        serializer = CarouselDrinkSerializer(drinks, many=True)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({"error":"Category not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_drink_by_id(request, id):
    try:
        drink = Drink.objects.get(pk=id)
        serializer = DrinkSerializer(instance=drink)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({"error":"Drink not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_carousel_featured_drinks(request):
    drinks = Drink.objects.filter(featured=True)
    serializer = CarouselDrinkSerializer(drinks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_autocomplete_results(request, query):
    drinks = Drink.objects.annotate(similarity_name=TrigramWordSimilarity(query,"name"),).filter(similarity_name__gt=0.3).order_by("-similarity_name")
    
    res = []
    for d in drinks:
        res.append({
            "id":d.id,
            "name":d.name
        })
    return Response(res)