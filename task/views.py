from rest_framework import viewsets
from .models import Task2
from .serializer import TasKSerializer

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TasKSerializer
    queryset = Task2.objects.all()