# api_urls.py
 
from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_home, name='api_home'),
    path('test/', views.test_page, name='test_page'),
]