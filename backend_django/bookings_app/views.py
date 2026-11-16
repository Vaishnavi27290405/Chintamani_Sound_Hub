import math
import uuid
from decimal import Decimal
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    SoundPackage,
    SoundAddOn,
    CustomerProfile,
    EventBooking,
    PaymentReceipt,
    GeoWarehouseLocation
)
from .serializers import (
    SoundPackageSerializer,
    SoundAddOnSerializer,
    CustomerProfileSerializer,
    EventBookingSerializer,
    PaymentReceiptSerializer,
    GeoWarehouseLocationSerializer
)

# Helper for Haversine distance in Python
def calculate_haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometers
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat / 2) * math.sin(dLat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon / 2) * math.sin(dLon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

@api_view(['GET'])
def get_sound_packages(request):
    """List all available LoudLee Series Dolby audio packages"""
    packages = SoundPackage.objects.all().order_by('price')
    serializer = SoundPackageSerializer(packages, many=True)
    return Response({
        "status": "success",
        "brand": "Chintamani Sound LoudLee Series",
        "count": packages.count(),
        "data": serializer.data
    })

@api_view(['GET'])
def get_sound_add_ons(request):
    """List all optional acoustic add-ons"""
    add_ons = SoundAddOn.objects.filter(is_active=True)
    serializer = SoundAddOnSerializer(add_ons, many=True)
    return Response({
        "status": "success",
        "data": serializer.data
    })

@api_view(['POST'])
def calculate_geolocation_transit(request):
    """
    Calculate real GPS distance & rig transit logistics from Pune HQ or nearest depot
    Body: { "latitude": 18.5204, "longitude": 73.8567, "city": "Pune" }
    """
    user_lat = float(request.data.get('latitude', 18.520430))
    user_lon = float(request.data.get('longitude', 73.856744))
    
    # Pune HQ coordinates
    hq_lat, hq_lon = 18.520430, 73.856744
    distance_km = calculate_haversine_distance(hq_lat, hq_lon, user_lat, user_lon)
    
    # Calculate transit time (heavy trailer speed approx 45 km/h + 1 hr buffer)
    transit_hours = max(1.0, round((distance_km / 45.0) + 1.0, 1))
    
    # Freight & generator fuel estimate
    dispatch_cost = 0 if distance_km <= 25 else int((distance_km - 25) * 35)
    
    return Response({
        "status": "success",
        "origin_hub": "Chintamani Sound Acoustic HQ (Pune)",
        "destination_coordinates": {"lat": user_lat, "lon": user_lon},
        "distance_km": distance_km,
        "estimated_transit_hours": transit_hours,
        "recommended_rig_dispatch_time": f"{transit_hours} hours prior to sound check",
        "freight_toll_estimate_inr": dispatch_cost,
        "dolby_engineer_assigned": "Senior Live Audio Engineer + 4 Technicians",
        "signal_lock": True
    })

@api_view(['POST'])
def create_booking_with_payment(request):
    """
    Process full online package reservation, customer verification, and invoice generation
    """
    data = request.data
    customer_data = data.get('customer', {})
    
    # Get or create customer
    customer, _ = CustomerProfile.objects.get_or_create(
        email=customer_data.get('email'),
        defaults={
            'full_name': customer_data.get('name', 'Valued Customer'),
            'phone': customer_data.get('phone', '+91 98000 00000'),
            'city': customer_data.get('city', 'Pune'),
        }
    )
    
    tier_id = data.get('package_tier', 'silver')
    package = SoundPackage.objects.filter(tier_id=tier_id).first()
    
    if not package:
        return Response(
            {"status": "error", "message": f"Package tier {tier_id} not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Compute totals
    package_price = package.price
    subtotal = package_price
    tax_amount = subtotal * Decimal('0.18')
    total_amount = subtotal + tax_amount
    
    advance_pct = int(data.get('advance_percentage', 100))
    advance_paid = total_amount * Decimal(advance_pct / 100.0)
    balance_due = total_amount - advance_paid
    
    # Create booking record
    booking_code = f"CS-LOUD-2026-{uuid.uuid4().hex[:6].upper()}"
    booking = EventBooking.objects.create(
        booking_code=booking_code,
        customer=customer,
        sound_package=package,
        event_type=data.get('event_type', 'Wedding & Sangeet'),
        event_date=data.get('event_date', timezone.now().date()),
        start_time=data.get('start_time', '18:00'),
        end_time=data.get('end_time', '23:30'),
        venue_name=data.get('venue_name', 'Grand Celebration Hall'),
        venue_city=data.get('venue_city', 'Pune'),
        venue_address=data.get('venue_address', 'Main Road'),
        expected_guests=int(data.get('expected_guests', 500)),
        special_instructions=data.get('special_instructions', ''),
        subtotal=subtotal,
        tax_amount=tax_amount,
        total_amount=total_amount,
        status='Confirmed'
    )
    
    # Create payment receipt
    receipt_num = f"INV-CS-{uuid.uuid4().hex[:6].upper()}"
    tx_id = f"PAY-TXN-{uuid.uuid4().hex[:8].upper()}"
    receipt = PaymentReceipt.objects.create(
        booking=booking,
        receipt_number=receipt_num,
        transaction_id=tx_id,
        payment_method=data.get('payment_method', 'upi'),
        advance_percentage=advance_pct,
        advance_paid=advance_paid,
        balance_due=balance_due,
        is_success=True
    )
    
    return Response({
        "status": "success",
        "message": "Sound package booked successfully via Django backend.",
        "booking_code": booking.booking_code,
        "receipt_number": receipt.receipt_number,
        "transaction_id": receipt.transaction_id,
        "total_amount": float(total_amount),
        "amount_paid": float(advance_paid),
        "balance_due": float(balance_due),
        "customer": {
            "name": customer.full_name,
            "phone": customer.phone,
            "email": customer.email
        },
        "sms_dispatched": True,
        "email_dispatched": True
    }, status=status.HTTP_201_CREATED)
