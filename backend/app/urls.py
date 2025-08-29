from django.urls import path
from .views import UsuarioListCreateView, UsuarioDetailView, AtividadeListCreateView, AtividadeDetailView

urlpatterns = [
    path('usuarios/', UsuarioListCreateView.as_view(), name='usuarios-list'),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view(), name='usuario-detail'),
    path('atividades/', AtividadeListCreateView.as_view(), name='atividades-list'),
    path('atividades/<int:pk>/', AtividadeDetailView.as_view(), name='atividade-detail'),
]
