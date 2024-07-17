# views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

from .models import MedicationInfo

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    print(f"Received login request with email: {email}, password: {password}")
    user = authenticate(request, username=email, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    else: 
        return Response({'error': 'Invalid credentials'}, status=400)


# Create your views here.
def test_page(request):
    return HttpResponse('This is a test page to verify if the \
                        django setup works')


def landing_page(request):
    return render(request, os.path.join(settings.FRONTEND_DIR, 'App.tsx'))


def get_medication_info(request, user_id):
    # THIS IS A SAMPLE USER, MUST BE EDITED
    # user_id = 1 
    if request.method == 'GET':
        meds = MedicationInfo.objects.filter(user_id=user_id)
        data = list(meds.values())
        return JsonResponse(data, safe=False)