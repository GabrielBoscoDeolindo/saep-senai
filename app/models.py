from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    NIVEL_PRIORIDADE = (
        ('low', 'Baixa'),
        ('mid', 'Média'),
        ('high', 'Alta'),
    )

    STATUS = (
        ('todo', 'A Fazer'),
        ('doing', 'Em andamento'),
        ('done', 'Concluído'),
    )

    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="atividades")
    desc = models.CharField(max_length=255)
    setor_responsavel = models.CharField(max_length=80)
    prioridade = models.CharField(max_length=5, choices=NIVEL_PRIORIDADE)
    data = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default='todo')

    def __str__(self):
        return f"{self.get_status_display()} - {self.desc}"
