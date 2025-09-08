from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('atividades/', AtividadeListCreateView.as_view(), name='atividades-list'),
    path('atividades/<int:pk>/', AtividadeDetailView.as_view(), name='atividade-detail'),
]
