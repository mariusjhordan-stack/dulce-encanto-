from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Categoria, Producto, Promocion
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionSerializer


class CategoriaListAPIView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoListAPIView(generics.ListAPIView):
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['precio', 'vendidos']

    def get_queryset(self):
        queryset = Producto.objects.all()
        categoria = self.request.query_params.get('categoria', None)
        if categoria and categoria.strip() and categoria.lower() != 'todas':
            if categoria.isdigit():
                queryset = queryset.filter(categoria_id=categoria)
            else:
                queryset = queryset.filter(categoria__nombre__iexact=categoria)
        return queryset


class ProductoDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)


class RecomendacionesAPIView(APIView):
    def get(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=404)
        recomendaciones = (
            Producto.objects
            .filter(categoria=producto.categoria)
            .exclude(pk=pk)
            .order_by('-destacado', '-vendidos')[:4]
        )
        serializer = ProductoSerializer(recomendaciones, many=True)
        return Response(serializer.data)


class PromocionListAPIView(generics.ListAPIView):
    serializer_class = PromocionSerializer

    def get_queryset(self):
        return Promocion.objects.filter(activa=True)
