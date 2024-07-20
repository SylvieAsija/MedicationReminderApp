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
        return Response({'error': 'All fields are required'},status=status.HTTP_400_BAD_REQUEST)


    print(f"Received login request with email: {email}, password: {password}")
    user = authenticate(request, username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    else: 
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    passwordConfirm = request.data.get('passwordConfirm')
    
    if not email or not password or not passwordConfirm:
        return Response({'error': 'All fields are required'},status=status.HTTP_400_BAD_REQUEST)
    
    if password != passwordConfirm:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
    if Users.objects.filter(username=email).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = Users.objects.create_user(username=email, email=email, password=password)
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
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