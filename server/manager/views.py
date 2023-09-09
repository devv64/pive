from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.core.mail import send_mail
from .decorators import unauthenticated_user
from order.models import Order
from product.models import Drink, ProductStoreInfo, Product
from .forms import OrderForm, DrinkForm, ProductStoreForm, ContactForm
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from .filters import DrinkFilter
# Create your views here.
@login_required(login_url='login')
def active(request):
    #TODO: active page should show more than just pending orders
    orders = Order.objects.filter(store=request.user.manager.store, status="p")
    return render(request, 'manager/active.html', {'orders':orders, 'from': 'active'})

@login_required(login_url='login')
def all(request):
    orders = Order.objects.filter(store=request.user.manager.store)
    return render(request, 'manager/active.html', {'orders':orders, 'from':'all'})

@unauthenticated_user
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            print("user logged in")
            return redirect('active')
        else:
            messages.info(request, 'username or password is incorrect')
    context = {}
    return render(request, 'manager/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('/')

@login_required(login_url='login')
def order_page(request, f, uuid):
    o = Order.objects.get(uuid=uuid)
    form = OrderForm(instance=o)
    if request.method == "POST":
        form = OrderForm(request.POST, instance=o)
        if form.is_valid():
            form.save()
            return redirect(f)
    return render(request, 'manager/order.html', {'order':o, 'order_items':o.order_items.all(), "form":form})

@login_required(login_url='login')
def inventory_page(request):
    store = request.user.manager.store
    drinksInStore = Drink.objects.filter(Q(products__productstoreinfo__store=store)).distinct()
    drinksNotInStore = Drink.objects.filter(~Q(products__productstoreinfo__store=store)).distinct()

    inStoreFilter = DrinkFilter(request.GET, queryset=drinksInStore)
    notInStoreFilter = DrinkFilter(request.GET, queryset=drinksNotInStore)

    drinksInStore = inStoreFilter.qs
    drinksNotInStore = notInStoreFilter.qs
    context = {'drinksInStore':drinksInStore, 
               'drinksNotInStore':drinksNotInStore,
               'drinkFilter':inStoreFilter}
    return render(request, 'manager/inventory.html', context)

@login_required(login_url='login')
def drink_page(request, id):
    d = Drink.objects.get(pk=id)
    store = request.user.manager.store
    sizesInStore = ProductStoreInfo.objects.filter(Q(product__drink=d) &
                                                   Q(store=store))
    sizesNotInStore = Product.objects.filter(Q(drink=d) &
                                                   ~Q(productstoreinfo__store=store))
    form = DrinkForm(instance = d)
    if request.method == "POST":
        form = DrinkForm(request.POST, instance = d)
        if form.is_valid():
            form.save()
            return redirect('drink', id=id)
    return render(request, 'manager/drink.html', {"form": form, "sizesInStore": sizesInStore, 'sizesNotInStore':sizesNotInStore})


@login_required(login_url='login')
def add_size(request, product_id): 
    p = Product.objects.get(id=product_id)
    try:
        ProductStoreInfo.objects.get(store = request.user.manager.store, product = p)
        return redirect('active')
    except ObjectDoesNotExist:
        if request.method == "POST":
            form = ProductStoreForm(request.POST)
            if form.is_valid():
                form.instance.store = request.user.manager.store
                form.instance.product = Product.objects.get(id=product_id)
                form.save()
                url = reverse('drink', args=[p.drink.id])
                return redirect(url)
        form = ProductStoreForm()
        return render(request, 'manager/add_product.html', {'form':form, 'product':p, 'action':'Add'})

@login_required(login_url='login')
def edit_size(request, product_id): #* SHOULD BE FIXED: only allow access to this page if size is alr held by store
    
    try:
        p = Product.objects.get(id=product_id)
        psi = ProductStoreInfo.objects.get(store=request.user.manager.store, product=p)
    except ObjectDoesNotExist:
        return redirect('active')
    if request.method == "POST":
        form = ProductStoreForm(request.POST, instance=psi)
        if form.is_valid():
            form.save()
            url = reverse('drink', args=[p.drink.id])
            return redirect(url)
    form = ProductStoreForm(instance=psi)
    return render(request, 'manager/add_product.html', {'form':form, 'product':p, 'action':'Edit'})

@login_required(login_url='login')
def delete_size(request, product_id):  #* SHOULD BE FIXED: only allow access to this page if size is alr held by store
    
    try:
        p = Product.objects.get(id=product_id)
        psi = ProductStoreInfo.objects.get(store=request.user.manager.store, product=p)
    except ObjectDoesNotExist:
        return redirect('active')
    psi.delete()
    url = reverse('drink', args=[p.drink.id])
    return redirect(url)

@login_required(login_url='login')
def contact_page(request): 
    form = ContactForm()
    if request.method=='POST':
        form = ContactForm(request.POST)
        try: 
            if form.is_valid():
                reason = form.cleaned_data['reason']
                message = form.cleaned_data['message']

                send_mail(
                    subject = f'Manager Contact Form - {reason}',
                    message = message,
                    from_email = 'pive.contact@gmail.com',
                    recipient_list=['orderpive@gmail.com'],
                    fail_silently=False,
                )
        except:
            messages.info(request, 'Error Sending Message')
        return redirect('contact')
    return render(request, 'manager/contact.html', {'form':form})