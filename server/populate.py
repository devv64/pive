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
Category.objects.get_or_create(name="Lager", parent=beer)
Category.objects.get_or_create(name="HardSeltzer", parent=beer)

user = authenticate(username="arjun", password="pass123")
if not user:
    user = User.objects.create_user("arjun","arjun@gmail.com","pass123")

store, _ = Store.objects.get_or_create(user=user, name="arjun's alc", location = "54 sample st, NJ", available=True)

with open('pive_sample_product_data.csv', 'r', encoding='utf-8-sig') as product_file:
    csv_reader = csv.DictReader(product_file)

    for line in csv_reader:
        try:
            category = Category.objects.get(name=line['category'])
        except: 
            print(line['category'])
            break
        drink, _ = Drink.objects.get_or_create(category=category, name=line['drink_name'], description=line['drink_description'])
        line['featured'] = True if line['featured'] == "TRUE" else False
        product, exists = Product.objects.get_or_create(drink=drink, size=line['size'], image_url=line['image_url'], featured=line['featured'])
        if not exists:
            line['price'] = line['price'][1:]
            prodstoreinfo = ProductStoreInfo(product=product, store=store, price=float(line['price']), stock=random.randint(5,30))
            prodstoreinfo.save()

        
        
        





