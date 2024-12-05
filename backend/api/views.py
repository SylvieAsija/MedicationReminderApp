# views.py

from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import os

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

Users = get_user_model()


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    print(f"Received login request with email: {email}, password: {password}")
    user = authenticate(request, username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        if not user.first_name or not user.last_name or not user.birthday or not user.phone_number:
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'moreInfo': 'true'
            }, status=status.HTTP_200_OK)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'moreInfo': 'false'
        }, status=status.HTTP_200_OK)
    else: 
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    passwordConfirm = request.data.get('passwordConfirm')
    
    if not email or not password or not passwordConfirm:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if password != passwordConfirm:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
    if Users.objects.filter(username=email).exists():
        return Response({'error': 'Account already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = Users.objects.create_user(username=email, email=email, password=password)
    
    refresh = RefreshToken.for_user(user)
    
    if not user.first_name or not user.last_name or not user.birthday or not user.phone_number:
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'moreInfo': 'true',
            'info': [user.first_name, user.last_name, user.birthday, user.phone_number]
        }, status=status.HTTP_201_CREATED)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'moreInfo': 'false',
        'info': 'false'
    }, status=status.HTTP_201_CREATED)


def logout(request):
    return


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_name(request):
    user = request.user
    print(user)
    
    if user.is_authenticated:
        return Response({
            'first_name': user.first_name, 
            'last_name': user.last_name
        }, status=status.HTTP_200_OK)

        
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def add_info(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    phone_number = request.data.get('phone_number')
    birthday = request.data.get('birthday')
    
    if not first_name or not last_name or not phone_number or not birthday:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    if len(phone_number) > 10:
        return Response({'error': 'Invalid Phone Number'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = Users.objects.update(first_name=first_name, last_name=last_name, phone_number=phone_number, birthday=birthday)
    return Response({
        'success': 'true'    
    }, status=status.HTTP_200_OK)
