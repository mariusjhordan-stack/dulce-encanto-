from rest_framework import generics
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer

class CategoriaListAPIView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoListAPIView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = Producto.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        if categoria and categoria.strip() and categoria.lower() != 'todas':
            if categoria.isdigit():
                queryset = queryset.filter(categoria_id=categoria)
            else:
                queryset = queryset.filter(categoria__nombre__iexact=categoria)
        return queryset
