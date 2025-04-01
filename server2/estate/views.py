from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .serializer import (UserProfileGetSerializer, UserProfileCreateSerializer, 
                         UserProfileUpdateSerializer, UserSerializer, PostPropertySerializer,
                         UpdatePropertySerializer)
import requests
from rest_framework import status
from django.conf import settings

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request, username=None):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(UserProfile, user=user)
    serializer = UserProfileGetSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_profile(request):
    serializer = UserProfileCreateSerializer(data=request.data)

    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)
    
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(UserProfile, user=user)

    serializer = UserProfileUpdateSerializer(profile, data=request.data, partial=request.method == 'PATCH')

    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)

@api_view(['POST'])
def post_property(request):
    serializer = PostPropertySerializer(data=request.data)
    if serializer.is_valid():
        try:
            result = serializer.validated_data
            headers = {
                'Authorization': 'settings.PROPERTY_SECRETE_KEY',
                'Content-Type': 'application/json',
            }

            response = requests.post('http://127.0.0.1:8001/post_property/', json=result, headers=headers)
            data = response.json()
            if response.status_code == 200:
                return Response(data)
            return Response({'message':'failed to post property'})
        
        except Exception as exception:
            return Response({'error': str(exception)}, status=400)
        
    return Response(serializer.errors)

@api_view(['POST'])
def update_property(request):
    serializer = UpdatePropertySerializer(data=request.data)
    if serializer.is_valid():
        try:
            result = serializer.validated_data
            headers = {
                'Authorization': 'settings.PROPERTY_SECRETE_KEY',
                'Content-Type':'application/json'
            }

            response = requests.put('http://127.0.0.1:8001/update_property/', json=result, headers=headers)
            data = response.json()
            if response.status_code == 200:
                return Response({'message':'property updated'})
            return Response({'message':'failed to updated property'})
        
        except Exception as exception:
            return Response({'error': str(exception)}, status=400)
        
    return Response(serializer.errors)
