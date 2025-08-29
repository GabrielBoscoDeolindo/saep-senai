from rest_framework import serializers
from .models import Usuario, Atividade

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email']

class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ['id', 'id_usuario', 'desc', 'setor_responsavel', 'prioridade', 'data', 'status']

