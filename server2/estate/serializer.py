from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'message':'password does not match'})
        return data
    
    def create(self, validated_data):
        password1 = validated_data.pop('password1')
        password2 = validated_data.pop('password2')
        user = User.objects.create(password=password1, **validated_data)
        return {'message':'user created successfully'}


class UserProfileGetSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'company', 'phone', 'email', 'bio', 'profile_pictures']

    def get_username(self, obj):
        username = obj.user.username
        return username


class UserProfileCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'company', 'phone', 'email', 'bio', 'profile_pictures']

    def create(request, validated_data):
        username = validated_data.pop('username')
        user = get_object_or_404(User, username=username)
        
        if UserProfile.objects.filter(user=user).exists():
            raise serializers.ValidationError({'message':'userprofile already exist'})
        
        UserProfile.objects.create(user=user, **validated_data)
        return {'message':'user profile created'}
    

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'company', 'phone', 'email', 'bio', 'profile_pictures']

    def update(self, instance, validated_data):
        username = validated_data.pop('username')
        user = get_object_or_404(User, username=username)

        if instance.user != user:
            raise serializers.ValidationError({'message':'userprofile not found'})
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return {'message':'userprofile updated sucessfully'}


class PostPropertySerializer(serializers.Serializer):
    listing = serializers.CharField(max_length=255, write_only=True, required=False)
    title = serializers.CharField(max_length=255, write_only=True, required=False)
    price = serializers.CharField(max_length=255, write_only=True, required=False)
    state = serializers.CharField(max_length=255, write_only=True, required=False)
    city = serializers.CharField(max_length=255, write_only=True, required=False)
    description = serializers.CharField(max_length=255, write_only=True, required=False)
    property_type = serializers.CharField(max_length=255, write_only=True, required=False)
    bedrooms = serializers.CharField(max_length=255, write_only=True, required=False)
    bathrooms = serializers.CharField(max_length=255, write_only=True, required=False)
    measurement = serializers.CharField(max_length=255, write_only=True, required=False)
    parking_space = serializers.BooleanField(write_only=True, required=False)
    garage = serializers.BooleanField(write_only=True, required=False)
    floor_count = serializers.CharField(max_length=255, write_only=True, required=False)
    swimming_pool = serializers.BooleanField(write_only=True, required=False)
    solar = serializers.BooleanField(write_only=True, required=False)
    status = serializers.CharField(max_length=255, write_only=True, required=False)
    agent_username = serializers.CharField(max_length=255, write_only=True, required=False)
    agent_phone = serializers.CharField(max_length=255, write_only=True, required=False)
    imagea = serializers.ImageField(required=False)
    imageb = serializers.ImageField(required=False)
    imagec = serializers.ImageField(required=False)
    fence = serializers.CharField(max_length=255, write_only=True, required=False)
    gate = serializers.BooleanField(write_only=True, required=False)
    elevator = serializers.BooleanField(write_only=True, required=False)
    restroom = serializers.BooleanField(write_only=True, required=False)
    unit = serializers.CharField(max_length=255, write_only=True, required=False)
    land_unit = serializers.CharField(max_length=255, write_only=True, required=False)

    def create(self, validated_data):
        return validated_data
    
class UpdatePropertySerializer(serializers.Serializer):
    slug = serializers.CharField(max_length=255, write_only=True, required=False)
    agent_username = serializers.CharField(max_length=255, write_only=True, required=False)
    title = serializers.CharField(max_length=255, write_only=True, required=False)
    state = serializers.CharField(max_length=255, write_only=True, required=False)
    city = serializers.CharField(max_length=255, write_only=True, required=False)
    description = serializers.CharField(max_length=255, write_only=True, required=False)
    property_type = serializers.CharField(max_length=255, write_only=True, required=False)
    bedrooms = serializers.CharField(max_length=255, write_only=True, required=False)
    bathrooms = serializers.CharField(max_length=255, write_only=True, required=False)
    measurement = serializers.CharField(max_length=255, write_only=True, required=False)
    unit = serializers.CharField(max_length=255, write_only=True, required=False)
    status = serializers.CharField(max_length=255, write_only=True, required=False)
    agent_phone = serializers.CharField(max_length=255, write_only=True, required=False)
    imagea = serializers.ImageField(required=False)
    imageb = serializers.ImageField(required=False)
    imagec = serializers.ImageField(required=False)

    def create(self, validated_data):
        return validated_data