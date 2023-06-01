from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('createuser/', views.createUser, name='create_user'),
    path('users/', views.get_user_list, name='user-list'),
    path('edituser/<int:user_id>/', views.editUser, name='edit_user'),
    path('deleteuser/<int:user_id>/', views.deleteUser, name='delete_user'),

]
