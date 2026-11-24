from decimal import Decimal
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.URLField(max_length=500, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    cantidad_disponible = models.IntegerField(default=0)
    descuento = models.IntegerField(default=0, help_text='Porcentaje de descuento (0-100)')
    destacado = models.BooleanField(default=False)
    vendidos = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre

    @property
    def precio_final(self):
        if self.descuento > 0:
            factor = Decimal(100 - self.descuento) / Decimal(100)
            return (self.precio * factor).quantize(Decimal('0.01'))
        return self.precio


class Promocion(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    codigo_cupon = models.CharField(max_length=50, unique=True)
    porcentaje = models.IntegerField(help_text='Porcentaje de descuento')
    activa = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Promoción'
        verbose_name_plural = 'Promociones'

    def __str__(self):
        return self.titulo
