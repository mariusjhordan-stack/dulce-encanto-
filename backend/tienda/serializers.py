from rest_framework import serializers
from .models import Categoria, Producto, Promocion


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    precio_final = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio', 'imagen_url',
            'categoria', 'categoria_nombre', 'cantidad_disponible',
            'descuento', 'destacado', 'vendidos', 'precio_final',
        ]


class PromocionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocion
        fields = '__all__'
