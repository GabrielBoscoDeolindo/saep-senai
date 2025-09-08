from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Atividade
from .serializers import RegisterSerializer, AtividadeSerializer
from .permissions import Gestor

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class AtividadeListCreateView(generics.ListCreateAPIView):
    serializer_class = AtividadeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Atividade.objects.all()
        return Atividade.objects.filter(id_usuario=user)

    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)


class AtividadeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    permission_classes = [IsAuthenticated, Gestor]