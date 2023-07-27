from django.shortcuts import render
import os, json, requests
from .models import Store
from rest_framework.decorators import api_view
import googlemaps
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def getAvailableStores(request):

    gmaps = googlemaps.Client(key=os.getenv('MAPS_SECRET'))
    source = json.loads(request.body)['address']
    resp = {
        "primary" : {},
        "all": []
    }
    for store in Store.objects.all():
        dest = store.location
        dist = float(gmaps.distance_matrix(origins=source,destinations=dest,units="imperial")['rows'][0]['elements'][0]['distance']['text'][:-3])
        if dist <= store.delivery_distance:
            resp['all'].append({"id":store.id, "name":store.name, "distance":dist})
            if not resp['primary'] or dist < resp['primary']['distance'] :
                resp['primary'] = {"id":store.id, "name":store.name, "distance":dist}

        
    return Response(resp)