from django.contrib import admin
from .models import (
    SoundPackage,
    SoundAddOn,
    CustomerProfile,
    EventBooking,
    PaymentReceipt,
    GeoWarehouseLocation
)

@admin.register(SoundPackage)
class SoundPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'tier_id', 'price', 'wattage_rms', 'crowd_capacity', 'is_popular')
    list_filter = ('is_popular',)

@admin.register(SoundAddOn)
class SoundAddOnAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'is_active')

@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'city', 'created_at')
    search_fields = ('full_name', 'email', 'phone')

@admin.register(EventBooking)
class EventBookingAdmin(admin.ModelAdmin):
    list_display = ('booking_code', 'customer', 'sound_package', 'event_type', 'event_date', 'total_amount', 'status')
    list_filter = ('status', 'event_type', 'event_date')
    search_fields = ('booking_code', 'customer__full_name', 'venue_name')

@admin.register(PaymentReceipt)
class PaymentReceiptAdmin(admin.ModelAdmin):
    list_display = ('receipt_number', 'transaction_id', 'payment_method', 'advance_paid', 'balance_due', 'is_success', 'paid_at')
    list_filter = ('payment_method', 'is_success')

@admin.register(GeoWarehouseLocation)
class GeoWarehouseLocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'latitude', 'longitude', 'is_main_hub', 'contact_phone')
