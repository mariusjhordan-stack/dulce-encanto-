from django.urls import path
from .views import CategoriaListAPIView, ProductoListAPIView

urlpatterns = [
    path('categorias/', CategoriaListAPIView.as_view(), name='lista-categorias'),
    path('productos/', ProductoListAPIView.as_view(), name='lista-productos'),
]
