# api_urls.py
 
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('', views.landing_page, name='landing_page'),
    path('api/login', views.login, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), 
         name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.test_page, name='test_page'),
    path('api/medication_info/<int:user_id>/', views.get_medication_info, 
         name='get_medication_info'),
]