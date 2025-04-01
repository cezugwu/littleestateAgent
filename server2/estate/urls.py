from django.urls import path
from . import views

urlpatterns = [
    path('post_user/', views.post_user),
    path('get_profile/<username>/', views.get_profile),
    path('post_profile/', views.post_profile),
    path('update_profile/<username>', views.update_profile),
    path('post_property/', views.post_property),
    path('update_property/', views.update_property),
]
