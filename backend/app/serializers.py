from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Atividade

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class AtividadeSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='id_usuario.username')

    class Meta:
        model = Atividade
        fields = ['id', 'username', 'desc', 'setor_responsavel', 'prioridade', 'data', 'status']
        read_only_fields = ['id_usuario']