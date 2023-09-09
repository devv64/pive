from django.forms import ModelForm
from django import forms
from order.models import Order
from product.models import Drink, ProductStoreInfo

class OrderForm(ModelForm):
    class Meta:
        model = Order
        fields = ["status"]

class DrinkForm(ModelForm):
    class Meta:
        model = Drink
        fields = ["name", "category", "description"]

class ProductStoreForm(ModelForm):
    class Meta:
        model = ProductStoreInfo
        fields = ["price", "stock"]

class ContactForm(forms.Form):
    REASONS = [
        ('New Brand/Size', 'New Brand/Size'),
        ('Feedback', 'Feedback'),
        ('Technical Support', 'Technical Support')
    ]
    reason = forms.ChoiceField(choices=REASONS)
    message = forms.CharField(widget=forms.Textarea)