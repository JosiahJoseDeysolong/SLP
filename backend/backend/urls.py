from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('private/', include('slpapp.privateapi.urls')),
    path('public/', include('slpapp.publicapi.urls')),
    path('query/', include('slpapp.projapi.urls')),


 ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)