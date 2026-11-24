from django.contrib import admin
from .models import Categoria, Producto, Promocion


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion')
    search_fields = ('nombre',)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'precio', 'categoria', 'cantidad_disponible', 'descuento', 'destacado', 'vendidos')
    list_editable = ('cantidad_disponible', 'descuento', 'destacado')
    list_filter = ('categoria', 'destacado')
    search_fields = ('nombre', 'descripcion')


@admin.register(Promocion)
class PromocionAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'codigo_cupon', 'porcentaje', 'activa')
    list_editable = ('activa',)
    list_filter = ('activa',)
