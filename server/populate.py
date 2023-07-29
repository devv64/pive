import csv
import django.db.models 
import random
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from product.models import *
from stores.models import Store
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


wine, _ = Category.objects.get_or_create(name="Wine")
beer, _ = Category.objects.get_or_create(name="Beer")
liqour, _ = Category.objects.get_or_create(name="Liqour")
Category.objects.get_or_create(name="RedWine", parent=wine)
Category.objects.get_or_create(name="WhiteWine", parent=wine)
Category.objects.get_or_create(name="Vodka", parent=liqour)
Category.objects.get_or_create(name="Whiskey", parent=liqour)
Category.objects.get_or_create(name="Gin", parent=liqour)
Category.objects.get_or_create(name="Tequila", parent=liqour)
Category.objects.get_or_create(name="Lager", parent=beer)
Category.objects.get_or_create(name="HardSeltzer", parent=beer)

user1 = authenticate(username="arjun", password="pass123")
if not user1:
    user1 = User.objects.create_user("arjun","arjun@gmail.com","pass123")

user2 = authenticate(username="dev", password="dev123")
if not user2:
    user2 = User.objects.create_user("dev","dev@gmail.com","dev123")

store1, _ = Store.objects.get_or_create(user=user1, name="arjun's alc", location = "25-33 Romaine St, Fair Lawn , NJ", delivery_distance = 10, available=True)
store2, _ = Store.objects.get_or_create(user=user2, name="dev's alc", location = "514 Steinway Road, Saddle Brook, NJ", delivery_distance = 10, available=True)


with open('pive_sample_product_data.csv', 'r', encoding='utf-8-sig') as product_file:
    csv_reader = csv.DictReader(product_file)

    for line in csv_reader:
        try:
            category = Category.objects.get(name=line['category'])
        except: 
            print(line['category'])
            break
        drink, _ = Drink.objects.get_or_create(category=category, name=line['drink_name'], description=line['drink_description'])
        if line['featured'] == "TRUE":
            drink.featured = True
            drink.save()
        product, not_exists = Product.objects.get_or_create(drink=drink, size=line['size'], image_url=line['image_url'])
        if not_exists:
            line['price'] = line['price'][1:]
            price = float(line['price'])
            try: 
                ProductStoreInfo.objects.get(product=product, store=store1, price=price)
            except:
                ProductStoreInfo.objects.create(product=product, store=store1, price=price, stock=random.randint(5,30))
            price = price + random.randint(-5,5)

            try:
                ProductStoreInfo.objects.get_or_create(product=product, store=store2, price=price)
            except:
                ProductStoreInfo.objects.create(product=product, store=store2, price=price, stock=random.randint(5,30))

        
        
        





