from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    is_superuser = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')

    def update(self, instance, validated_data):
        # Exclude password from validated data if not provided
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)
    
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User created successfully'})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',
        'api/createuser',
    ]
    return Response(routes)

@api_view(['GET'])
def get_user_list(request):
    users = User.objects.all().exclude(is_superuser=True)
    user_data = [{'username': user.username,
                   'email': user.email,
                   'is_staff': user.is_staff,
                   'first_name': user.first_name,
                   'last_name': user.last_name,
                    'id': user.id,
                   
                   } for user in users]
    return Response(user_data)

@api_view(['PUT'])
def editUser(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user, data=request.data, partial=True)  # Use partial=True for partial updates
    if serializer.is_valid():
        # Exclude password field if not provided
        password = request.data.get('password')
        if not password:
            serializer.validated_data.pop('password', None)
        
        serializer.save()
        return Response({'message': 'User updated successfully'})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUser(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    if not request.user.is_superuser:
        return Response({'message': 'Only superusers can delete users.'}, status=status.HTTP_403_FORBIDDEN)
    user.delete()
    return Response({'message': 'User deleted successfully'})