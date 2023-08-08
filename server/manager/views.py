from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user
# Create your views here.
@login_required(login_url='login')
def active(request):
    return render(request, 'manager/active.html')

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
    return redirect('login')