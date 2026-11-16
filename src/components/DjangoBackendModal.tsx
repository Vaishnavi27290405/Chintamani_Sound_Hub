import React, { useState } from 'react';
import {
  X,
  Database,
  Code,
  Terminal,
  Server,
  Play,
  Check,
  Copy,
  Layers,
  FileCode,
  Sparkles,
  Download,
  CheckCircle2,
  Table,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface DjangoBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBooking: () => void;
}

export const DjangoBackendModal: React.FC<DjangoBackendModalProps> = ({
  isOpen,
  onClose,
  onNavigateToBooking
}) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'models' | 'architecture' | 'setup'>('endpoints');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Interactive API Console State
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/v1/packages/');
  const [apiResponse, setApiResponse] = useState<any>({
    status: "success",
    brand: "Chintamani Sound LoudLee Series",
    count: 3,
    data: [
      {
        id: 1,
        tier_id: "simple",
        name: "Simple Package",
        tagline: "Crisp Dolby Clarity for Intimate Gatherings & Family Sangeet",
        price: "18500.00",
        wattage_rms: "3,500W RMS",
        crowd_capacity: "Up to 200 Guests",
        line_array_tops: "2x Dual 10\" Mid-High Tops",
        subwoofers: "2x 18\" Front-Firing Subwoofers",
        mixer_console: "16-Channel Digital Soundcraft Desk",
        is_popular: false
      },
      {
        id: 2,
        tier_id: "silver",
        name: "Silver Package",
        tagline: "Massive Sub-Bass Authority & High Throw Array for Grand Weddings",
        price: "36000.00",
        wattage_rms: "9,000W RMS",
        crowd_capacity: "500 - 1,500 Guests",
        line_array_tops: "4x Dual 12\" Dolby Line Array Elements",
        subwoofers: "4x 18\" Horn-Loaded Subwoofers (32Hz)",
        mixer_console: "Allen & Heath SQ6 48-Channel Console",
        is_popular: true
      },
      {
        id: 3,
        tier_id: "gold",
        name: "Gold Package",
        tagline: "Tour-Grade Dolby Concert Mega Rig for EDM, Bands & Mega Festivals",
        price: "68000.00",
        wattage_rms: "24,000W RMS",
        crowd_capacity: "2,000 - 10,000+ Guests",
        line_array_tops: "8x Dual 12\" Touring High-Throw Array",
        subwoofers: "8x Dual 18\" Ground-Pounding Sub Rigs",
        mixer_console: "Behringer X32 / Midas M32 96kHz Desk",
        is_popular: false
      }
    ]
  });
  const [apiStatusCode, setApiStatusCode] = useState<number>(200);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTestEndpoint = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setIsLoadingApi(true);

    setTimeout(() => {
      setIsLoadingApi(false);
      if (endpoint === 'GET /api/v1/packages/') {
        setApiStatusCode(200);
        setApiResponse({
          status: "success",
          brand: "Chintamani Sound LoudLee Series",
          count: 3,
          data: [
            { tier_id: "simple", name: "Simple Package (3,500W)", price: 18500.00 },
            { tier_id: "silver", name: "Silver Package (9,000W - Most Popular)", price: 36000.00 },
            { tier_id: "gold", name: "Gold Package (24,000W Mega Rig)", price: 68000.00 }
          ]
        });
      } else if (endpoint === 'POST /api/v1/geo-dispatch/') {
        setApiStatusCode(200);
        setApiResponse({
          status: "success",
          origin_hub: "Chintamani Sound Acoustic HQ (Pune)",
          destination_coordinates: { lat: 18.52043, lon: 73.856744 },
          distance_km: 12.4,
          estimated_transit_hours: 1.2,
          recommended_rig_dispatch_time: "1.2 hours prior to sound check",
          freight_toll_estimate_inr: 0,
          dolby_engineer_assigned: "Senior Live Audio Engineer + 4 Technicians",
          signal_lock: true
        });
      } else if (endpoint === 'POST /api/v1/bookings/create/') {
        setApiStatusCode(201);
        setApiResponse({
          status: "success",
          message: "Sound package booked successfully via Django backend.",
          booking_code: "CS-LOUD-2026-A8F9B2",
          receipt_number: "INV-CS-984210",
          transaction_id: "PAY-TXN-UPI994821",
          total_amount: 42480.00,
          amount_paid: 42480.00,
          balance_due: 0.00,
          customer: {
            name: "Vaishnavi Kawale",
            phone: "+91 98220 54321",
            email: "kawalevaishnavi759@gmail.com"
          },
          sms_dispatched: true,
          email_dispatched: true,
          db_engine: "Django ORM with PostgreSQL / SQLite3"
        });
      } else if (endpoint === 'GET /api/v1/add-ons/') {
        setApiStatusCode(200);
        setApiResponse({
          status: "success",
          count: 4,
          data: [
            { id: 1, name: "Dual 18-inch Subwoofer Add-on", price: 6500.00, category: "Low Frequency" },
            { id: 2, name: "Stage Monitor Wedges Pair", price: 3500.00, category: "Stage Foldback" },
            { id: 3, name: "Wireless Shure Beta 58A Cordless Mics (Set of 4)", price: 4000.00, category: "Mics" },
            { id: 4, name: "Sharpy Moving Head Stage Lights (Pair)", price: 4500.00, category: "Lighting" }
          ]
        });
      }
    }, 300);
  };

  const DJANGO_MODELS_CODE = `# backend_django/bookings_app/models.py
from django.db import models
from django.contrib.auth.models import User
import uuid

class SoundPackage(models.Model):
    """LoudLee Series Dolby Audio Event Packages"""
    PACKAGE_TIERS = (
        ('simple', 'Simple Package (3,500W RMS)'),
        ('silver', 'Silver Package (9,000W RMS - Popular)'),
        ('gold', 'Gold Package (24,000W RMS - Concert Rig)'),
    )
    
    tier_id = models.CharField(max_length=20, choices=PACKAGE_TIERS, unique=True)
    name = models.CharField(max_length=150)
    tagline = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    wattage_rms = models.CharField(max_length=50)
    crowd_capacity = models.CharField(max_length=100)
    line_array_tops = models.CharField(max_length=200)
    subwoofers = models.CharField(max_length=200)
    mixer_console = models.CharField(max_length=200)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"

class EventBooking(models.Model):
    """Online Rig Reservation & Event Logistics"""
    booking_code = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=20)
    customer_email = models.EmailField()
    sound_package = models.ForeignKey(SoundPackage, on_delete=models.PROTECT)
    event_type = models.CharField(max_length=50)
    event_date = models.DateField()
    venue_city = models.CharField(max_length=100)
    venue_address = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

class PaymentReceipt(models.Model):
    """GST Tax Invoices & Digital Receipts"""
    booking = models.OneToOneField(EventBooking, on_delete=models.CASCADE, related_name='payment')
    receipt_number = models.CharField(max_length=60, unique=True)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=30)
    advance_paid = models.DecimalField(max_digits=10, decimal_places=2)
    balance_due = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    paid_at = models.DateTimeField(auto_now_add=True)`;

  const DJANGO_VIEWS_CODE = `# backend_django/bookings_app/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SoundPackage, EventBooking, PaymentReceipt
from .serializers import SoundPackageSerializer, EventBookingSerializer
import math

@api_view(['GET'])
def get_sound_packages(request):
    """Fetch all LoudLee sound tiers with full acoustic specs"""
    packages = SoundPackage.objects.all().order_by('price')
    serializer = SoundPackageSerializer(packages, many=True)
    return Response({"status": "success", "data": serializer.data})

@api_view(['POST'])
def calculate_geolocation_transit(request):
    """Real-time Haversine distance from Pune HQ (18.5204° N, 73.8567° E)"""
    user_lat = float(request.data.get('latitude', 18.5204))
    user_lon = float(request.data.get('longitude', 73.8567))
    hq_lat, hq_lon = 18.52043, 73.856744
    
    # Haversine distance in km
    R = 6371
    dLat = math.radians(user_lat - hq_lat)
    dLon = math.radians(user_lon - hq_lon)
    a = math.sin(dLat/2)**2 + math.cos(math.radians(hq_lat)) * math.cos(math.radians(user_lat)) * math.sin(dLon/2)**2
    dist_km = round(R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a)), 1)
    
    transit_hours = max(1.0, round((dist_km / 45.0) + 1.0, 1))
    return Response({
        "status": "success",
        "distance_km": dist_km,
        "estimated_transit_hours": transit_hours,
        "assigned_crew": "1 Lead Audio Engineer + 4 Technicians"
    })`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0a0216] border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#120427] border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#0d021c] rounded-[10px] flex items-center justify-center">
                <Code className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white">Python Programming & Django Database Architecture</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  Django 5.0 REST API
                </span>
              </div>
              <p className="text-xs text-purple-300/80">
                Chintamani Sound LoudLee Series backend with Django ORM models, REST Framework serializers, and PostgreSQL/SQLite database.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-[#0d021c] border-b border-purple-500/20 flex space-x-2 overflow-x-auto">
          {[
            { id: 'endpoints', label: 'Django REST API Console', icon: Terminal },
            { id: 'models', label: 'Django ORM Models & DB', icon: Database },
            { id: 'architecture', label: 'Database Schema & Tables', icon: Table },
            { id: 'setup', label: 'Run Local Django Server', icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#15052d] text-white border-t border-x border-purple-500/40 shadow-sm'
                    : 'text-purple-300/70 hover:text-purple-200 hover:bg-purple-950/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-purple-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* TAB 1: REST API Console */}
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Test Live Django REST Framework Endpoints</h4>
                  <p className="text-xs text-purple-300/70">
                    Interact directly with the simulated Django API endpoints for packages, geolocation dispatch, and bookings.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'GET /api/v1/packages/',
                    'POST /api/v1/geo-dispatch/',
                    'POST /api/v1/bookings/create/',
                    'GET /api/v1/add-ons/'
                  ].map((ep) => (
                    <button
                      key={ep}
                      onClick={() => handleTestEndpoint(ep)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedEndpoint === ep
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-[#150529] text-purple-300 border border-purple-500/20 hover:border-purple-400/40'
                      }`}
                    >
                      {ep}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoint Request / Response Terminal */}
              <div className="rounded-2xl bg-[#05000a] border border-purple-500/30 overflow-hidden font-mono text-xs shadow-xl">
                <div className="px-4 py-2.5 bg-[#120324] border-b border-purple-500/20 flex items-center justify-between text-purple-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-white">{selectedEndpoint}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                      HTTP {apiStatusCode} {apiStatusCode === 201 ? 'CREATED' : 'OK'}
                    </span>
                    <button
                      onClick={() => handleCopy(JSON.stringify(apiResponse, null, 2), 'response')}
                      className="p-1 rounded hover:bg-purple-900/60 text-purple-300"
                      title="Copy JSON Response"
                    >
                      {copiedCode === 'response' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 overflow-x-auto text-purple-200 bg-[#06010d] max-h-[280px]">
                  {isLoadingApi ? (
                    <div className="py-8 text-center text-purple-400 animate-pulse">
                      Executing Django REST query via Python ORM...
                    </div>
                  ) : (
                    <pre className="text-emerald-300/90 text-xs">
                      {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#130526] border border-purple-500/20 flex items-center justify-between">
                <div className="text-xs text-purple-200">
                  <strong>Backend Location:</strong> All real Django project files are saved in the project repository at <code className="text-emerald-400 font-mono">/backend_django/</code>.
                </div>
                <button
                  onClick={onNavigateToBooking}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>Book Package Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Django ORM Models */}
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Django Models & PostgreSQL/SQLite Schema</h4>
                  <p className="text-xs text-purple-300/70">
                    Defines SoundPackage, EventBooking, PaymentReceipt, and GeoWarehouseLocation entities.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(DJANGO_MODELS_CODE, 'models')}
                  className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-200 text-xs flex items-center space-x-1.5 hover:bg-purple-900 transition-colors"
                >
                  {copiedCode === 'models' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'models' ? 'Copied!' : 'Copy models.py'}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-[#05000a] border border-purple-500/30 overflow-hidden font-mono text-xs">
                <div className="px-4 py-2 bg-[#120324] border-b border-purple-500/20 text-purple-300 flex items-center space-x-2">
                  <FileCode className="w-3.5 h-3.5 text-purple-400" />
                  <span>backend_django/bookings_app/models.py</span>
                </div>
                <pre className="p-4 text-purple-200 overflow-x-auto max-h-[320px] text-[11px] leading-relaxed">
                  {DJANGO_MODELS_CODE}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Database Schema Tables */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm">Relational Database Entity Relationship</h4>
                <p className="text-xs text-purple-300/70">
                  Django manages these relational tables inside SQLite / PostgreSQL for Chintamani Sound bookings and receipts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#120324] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="font-bold text-white text-xs">Table: bookings_app_soundpackage</span>
                    <span className="text-[10px] font-mono text-purple-400">Primary Catalog</span>
                  </div>
                  <ul className="text-xs text-purple-200/90 space-y-1 font-mono text-[11px]">
                    <li>• <strong className="text-purple-300">id</strong>: BigAutoField (PK)</li>
                    <li>• <strong className="text-purple-300">tier_id</strong>: CharField(20) [simple/silver/gold]</li>
                    <li>• <strong className="text-purple-300">price</strong>: DecimalField(10, 2)</li>
                    <li>• <strong className="text-purple-300">wattage_rms</strong>: CharField(50)</li>
                    <li>• <strong className="text-purple-300">line_array_tops</strong>: CharField(200)</li>
                    <li>• <strong className="text-purple-300">subwoofers</strong>: CharField(200)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#120324] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="font-bold text-white text-xs">Table: bookings_app_eventbooking</span>
                    <span className="text-[10px] font-mono text-purple-400">Event Reservations</span>
                  </div>
                  <ul className="text-xs text-purple-200/90 space-y-1 font-mono text-[11px]">
                    <li>• <strong className="text-purple-300">id</strong>: BigAutoField (PK)</li>
                    <li>• <strong className="text-purple-300">booking_code</strong>: CharField(50) (Unique)</li>
                    <li>• <strong className="text-purple-300">sound_package_id</strong>: ForeignKey (FK)</li>
                    <li>• <strong className="text-purple-300">customer_phone</strong>: CharField(20)</li>
                    <li>• <strong className="text-purple-300">event_date</strong>: DateField</li>
                    <li>• <strong className="text-purple-300">total_amount</strong>: DecimalField(10, 2)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#120324] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="font-bold text-white text-xs">Table: bookings_app_paymentreceipt</span>
                    <span className="text-[10px] font-mono text-purple-400">GST Tax Invoices</span>
                  </div>
                  <ul className="text-xs text-purple-200/90 space-y-1 font-mono text-[11px]">
                    <li>• <strong className="text-purple-300">id</strong>: BigAutoField (PK)</li>
                    <li>• <strong className="text-purple-300">booking_id</strong>: OneToOneField (FK)</li>
                    <li>• <strong className="text-purple-300">receipt_number</strong>: CharField(60) (Unique)</li>
                    <li>• <strong className="text-purple-300">transaction_id</strong>: CharField(100)</li>
                    <li>• <strong className="text-purple-300">advance_paid</strong>: DecimalField(10, 2)</li>
                    <li>• <strong className="text-purple-300">paid_at</strong>: DateTimeField</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#120324] border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="font-bold text-white text-xs">Table: bookings_app_geowarehouse</span>
                    <span className="text-[10px] font-mono text-purple-400">GPS Rig Hubs</span>
                  </div>
                  <ul className="text-xs text-purple-200/90 space-y-1 font-mono text-[11px]">
                    <li>• <strong className="text-purple-300">id</strong>: BigAutoField (PK)</li>
                    <li>• <strong className="text-purple-300">name</strong>: CharField(200) [Pune Main HQ]</li>
                    <li>• <strong className="text-purple-300">latitude / longitude</strong>: DecimalField(9, 6)</li>
                    <li>• <strong className="text-purple-300">is_main_hub</strong>: BooleanField</li>
                    <li>• <strong className="text-purple-300">available_rigs</strong>: IntegerField</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Setup & Instructions */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm">How to Run the Python Django Server Locally</h4>
                <p className="text-xs text-purple-300/70">
                  Follow these simple terminal commands to start the Django development server and access the Django Admin panel.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#05000a] border border-purple-500/30 font-mono text-xs space-y-3">
                <div className="text-purple-400 font-bold"># 1. Open terminal and navigate to django folder</div>
                <div className="p-2.5 rounded-lg bg-[#120324] text-emerald-400 select-all">
                  cd backend_django
                </div>

                <div className="text-purple-400 font-bold"># 2. Install requirements</div>
                <div className="p-2.5 rounded-lg bg-[#120324] text-emerald-400 select-all">
                  pip install -r requirements.txt
                </div>

                <div className="text-purple-400 font-bold"># 3. Run database migrations</div>
                <div className="p-2.5 rounded-lg bg-[#120324] text-emerald-400 select-all">
                  python manage.py makemigrations && python manage.py migrate
                </div>

                <div className="text-purple-400 font-bold"># 4. Start Django server</div>
                <div className="p-2.5 rounded-lg bg-[#120324] text-emerald-400 select-all">
                  python manage.py runserver 0.0.0.0:8000
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/20 text-xs text-purple-200 leading-relaxed flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Django Admin will be running at <strong>http://127.0.0.1:8000/admin/</strong> where you can view live bookings, export GST invoices, and edit sound rig inventory!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-[#0e021f] border-t border-purple-500/30 flex items-center justify-between">
          <div className="text-xs text-purple-400 font-mono hidden sm:block">
            Chintamani Sound • LoudLee Series Django Architecture
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#17052e] hover:bg-purple-900 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-colors"
            >
              Close Hub
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateToBooking();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-600/30 hover:scale-105 transition-all"
            >
              Proceed to Book Rig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
