# Chintamani Sound (LoudLee Series) - Python & Django Backend

Official Python Django REST API and database engine for **Chintamani Sound LoudLee Series Dolby Audio Systems**.

## 🚀 Quickstart Guide

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Apply Django Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Create Django Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 4. Run Django Development Server
```bash
python manage.py runserver 0.0.0.0:8000
```

The Django REST API will be accessible at `http://127.0.0.1:8000/api/v1/` and the Django Admin panel at `http://127.0.0.1:8000/admin/`.

---

## 📡 Available Django REST Endpoints

- `GET /api/v1/packages/` - Retrieve all LoudLee Dolby sound packages (Simple, Silver, Gold) with acoustic specs.
- `GET /api/v1/add-ons/` - Retrieve all acoustic and stage add-ons.
- `POST /api/v1/geo-dispatch/` - Calculate real-time Haversine distance, trailer transit hours, and freight dispatch fees from Pune HQ using GPS coordinates.
- `POST /api/v1/bookings/create/` - Create a verified online booking, calculate 18% GST tax, process advance token, and generate official Tax Invoice.
