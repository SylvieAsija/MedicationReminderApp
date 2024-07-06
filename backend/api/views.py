# views.py

from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def test_page(request):
    return HttpResponse('This is a test page to verify if the django setup works')

def api_home(request):
    return HttpResponse('API Landing page')