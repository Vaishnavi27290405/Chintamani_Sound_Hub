from rest_framework import serializers
from .models import (
    SoundPackage,
    SoundAddOn,
    CustomerProfile,
    EventBooking,
    PaymentReceipt,
    GeoWarehouseLocation
)

class SoundAddOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundAddOn
        fields = '__all__'

class SoundPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundPackage
        fields = '__all__'

class GeoWarehouseLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoWarehouseLocation
        fields = '__all__'

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'

class PaymentReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentReceipt
        fields = '__all__'

class EventBookingSerializer(serializers.ModelSerializer):
    sound_package_details = SoundPackageSerializer(source='sound_package', read_only=True)
    customer_details = CustomerProfileSerializer(source='customer', read_only=True)
    payment_details = PaymentReceiptSerializer(source='payment', read_only=True)
    add_ons_details = SoundAddOnSerializer(source='add_ons', many=True, read_only=True)
    
    class Meta:
        model = EventBooking
        fields = '__all__'
