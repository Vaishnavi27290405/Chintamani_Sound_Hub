from django.urls import path
from . import views

urlpatterns = [
    path('packages/', views.get_sound_packages, name='sound-packages'),
    path('add-ons/', views.get_sound_add_ons, name='sound-add-ons'),
    path('geo-dispatch/', views.calculate_geolocation_transit, name='geo-dispatch'),
    path('bookings/create/', views.create_booking_with_payment, name='create-booking'),
]
