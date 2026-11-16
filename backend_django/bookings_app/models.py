from django.db import models
from django.contrib.auth.models import User
import uuid

class GeoWarehouseLocation(models.Model):
    """Warehouse & Sound Rig Depots for GPS Geolocation & Transit Calculation"""
    name = models.CharField(max_length=200, help_text="e.g. Pune Main Rig Yard & Acoustic Lab")
    city = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=18.520430)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=73.856744)
    address = models.TextField()
    is_main_hub = models.BooleanField(default=False)
    contact_phone = models.CharField(max_length=20, default="+91 98220 54321")
    available_rigs = models.IntegerField(default=5)
    
    def __str__(self):
        return f"{self.name} ({self.city})"

class SoundPackage(models.Model):
    """LoudLee Series Dolby Audio Event Packages"""
    PACKAGE_TIERS = (
        ('simple', 'Simple Package (3,500W RMS)'),
        ('silver', 'Silver Package (9,000W RMS - Most Popular)'),
        ('gold', 'Gold Package (24,000W RMS - Mega Concert Rig)'),
    )
    
    tier_id = models.CharField(max_length=20, choices=PACKAGE_TIERS, unique=True)
    name = models.CharField(max_length=150)
    tagline = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    wattage_rms = models.CharField(max_length=50, help_text="e.g. 9,000W RMS")
    crowd_capacity = models.CharField(max_length=100, help_text="e.g. 500 - 1,500 Guests")
    is_popular = models.BooleanField(default=False)
    
    # Technical Acoustic Specs
    line_array_tops = models.CharField(max_length=200)
    subwoofers = models.CharField(max_length=200)
    mixer_console = models.CharField(max_length=200)
    amplifiers = models.CharField(max_length=200)
    microphones = models.CharField(max_length=200)
    stage_monitors = models.CharField(max_length=200)
    dolby_processor = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - ₹{self.price}"

class SoundAddOn(models.Model):
    """Optional Acoustic & Stage Hardware Add-ons"""
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=50, default="Acoustic")
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} (+₹{self.price})"

class CustomerProfile(models.Model):
    """Registered Customer for Invoices & Gatepasses"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=100, default="Pune")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.full_name} ({self.phone})"

class EventBooking(models.Model):
    """Online Rig Reservation & Event Logistics"""
    EVENT_TYPES = (
        ('Wedding & Sangeet', 'Wedding & Sangeet Night'),
        ('Live Concert / Band', 'Live Concert / Rock Band'),
        ('DJ Night', 'DJ Night / EDM Dance Party'),
        ('Festival / Shobha Yatra', 'Festival / Shobha Yatra / Visarjan'),
        ('Corporate Event', 'Corporate Gala / Seminar'),
        ('Private Celebration', 'Private Birthday / Anniversary'),
        ('Other', 'Other Custom Event'),
    )
    
    STATUS_CHOICES = (
        ('Confirmed', 'Confirmed & Rig Locked'),
        ('Setup In Progress', 'Setup In Progress'),
        ('Completed', 'Event Completed'),
        ('Cancelled', 'Cancelled'),
    )
    
    booking_code = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name='bookings')
    sound_package = models.ForeignKey(SoundPackage, on_delete=models.PROTECT)
    add_ons = models.ManyToManyField(SoundAddOn, blank=True)
    
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    venue_name = models.CharField(max_length=255)
    venue_city = models.CharField(max_length=100)
    venue_address = models.TextField()
    expected_guests = models.IntegerField(default=200)
    special_instructions = models.TextField(blank=True, null=True)
    
    # Financials
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="18% GST")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.booking_code} - {self.customer.full_name} ({self.event_date})"

class PaymentReceipt(models.Model):
    """Payment Gateway Transactions & GST Tax Invoices"""
    PAYMENT_METHODS = (
        ('upi', 'UPI / QR Code (Google Pay, PhonePe, Paytm)'),
        ('card', 'Debit / Credit Card (Visa/Mastercard/RuPay)'),
        ('netbanking', 'NetBanking Online Transfer'),
    )
    
    booking = models.OneToOneField(EventBooking, on_delete=models.CASCADE, related_name='payment')
    receipt_number = models.CharField(max_length=60, unique=True)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHODS)
    advance_percentage = models.IntegerField(default=100)
    advance_paid = models.DecimalField(max_digits=10, decimal_places=2)
    balance_due = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_success = models.BooleanField(default=True)
    paid_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.receipt_number} - ₹{self.advance_paid}"
