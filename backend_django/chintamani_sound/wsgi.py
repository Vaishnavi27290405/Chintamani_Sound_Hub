"""
WSGI config for chintamani_sound project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chintamani_sound.settings')
application = get_wsgi_application()
