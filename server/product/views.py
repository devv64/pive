from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from django.contrib.postgres.search import TrigramWordSimilarity
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
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
def get_carousel_drinks_by_category(request, category): #! Store filter
    try:
        categories = Category.objects.get(name=category).get_descendants(include_self=True)
        for c in categories:
            print(c.name)
        drinks = Drink.objects.filter(category__in=categories)
        serializer = LightDrinkSerializer(drinks, many=True)
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
    drinks = Product.objects.filter(featured=True)
    serializer = ProductSerializer(drinks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_autocomplete_results(request, query): #! Store filter??

    vector = SearchVector('name', weight='A') + SearchVector('description', weight='B')
    search_query = SearchQuery(query)

    drinks = Drink.objects.annotate(rank=SearchRank(vector, search_query), 
                                    similarity=TrigramWordSimilarity(query,"name") + TrigramWordSimilarity(query,"description")
                                    ).filter(Q(rank__gte=0.3) | Q(similarity__gt=0.8)
                                             ).order_by('-rank')

    # drinks = Drink.objects.annotate(similarity_name=TrigramWordSimilarity(query,"name"),).filter(similarity_name__gt=0.3).order_by("-similarity_name")
    # desc_drinks = Drink.objects.annotate(similarity_desc=TrigramWordSimilarity(query,"description"),).filter(similarity_desc__gt=0.8).order_by("-similarity_desc")

    # for d in drinks:
    #     print(d.name)
    res = []
    for d in drinks:
        res.append({
            "id":d.id,
            "name":d.name
        })
    return Response(res)

@api_view(['GET'])
def get_query_results(request, query, page_num): #! Store filter

    vector = SearchVector('name', weight='A') + SearchVector('description', weight='B')
    search_query = SearchQuery(query)

    #queries top 100 closest matches to query
    drinks = Drink.objects.annotate(rank=SearchRank(vector, search_query), 
                                    similarity=TrigramWordSimilarity(query,"name") + TrigramWordSimilarity(query,"description")
                                    ).order_by('-rank', '-similarity')
    
    items_per_page = 20 #? make this a parameter?
    p = Paginator(drinks, items_per_page) #throw that shit into a paginator
    page = p.get_page(page_num)

    resp = {"query": query,
               "page_count": p.num_pages,
               "has_prev": page.has_previous(),
               "has_next": page.has_next(), }
    resp['products'] = LightDrinkSerializer(page.object_list, many=True).data

    return Response(resp) #so what are we returning here, the list of

@api_view(['GET'])
def get_category_results(request, category, page_num): #! Store filter
    c = Category.objects.get(name=category)

    if c.is_leaf_node():
        categories = c.get_siblings(include_self=True) # Grabs Siblings: Request for red wines will also output white wines after all the red wines
    else:
        categories = c.get_descendants(include_self=True) # Request for Non-leaf node e.g. Wine will grab children: Red Wine and White Wine

    drinks = Drink.objects.filter(category__in = categories).order_by('category')

    items_per_page = 20 #? make this a parameter?
    p = Paginator(drinks, items_per_page)
    page = p.get_page(page_num)

    resp = {"category": category,
               "page_count": p.num_pages,
               "has_prev": page.has_previous(),
               "has_next": page.has_next(), }
    resp['products'] = LightDrinkSerializer(page.object_list, many=True).data
    return Response(resp)


