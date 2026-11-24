from django.urls import path
from .views import (
    CategoriaListAPIView,
    ProductoListAPIView,
    ProductoDetailAPIView,
    RecomendacionesAPIView,
    PromocionListAPIView,
)

urlpatterns = [
    path('categorias/', CategoriaListAPIView.as_view(), name='lista-categorias'),
    path('productos/', ProductoListAPIView.as_view(), name='lista-productos'),
    path('productos/<int:pk>/', ProductoDetailAPIView.as_view(), name='detalle-producto'),
    path('productos/<int:pk>/recomendaciones/', RecomendacionesAPIView.as_view(), name='recomendaciones'),
    path('promociones/', PromocionListAPIView.as_view(), name='lista-promociones'),
]
