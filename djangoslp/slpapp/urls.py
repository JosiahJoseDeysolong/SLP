from django.conf.urls import url
from slpapp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^project$',views.projectApi),
    url(r'^project/([0-9]+)$',views.projectApi),

    url(r'^benif$',views.BeneficiarieAPI),
    url(r'^benif/([0-9]+)$',views.BeneficiarieAPI),

    url(r'^gallery$',views.GalleryApi),
    url(r'^gallery/([0-9]+)$',views.GalleryApi),
    
    url(r'^faculty$',views.FacultyApi),
    url(r'^faculty/([0-9]+)$',views.FacultyApi),

    url(r'^partner$',views.PartnerApi),
    url(r'^partner/([0-9]+)$',views.PartnerApi),

    url(r'^report$',views.ReportsApi),
    url(r'^report/([0-9]+)$',views.ReportsApi),

    url(r'^article$',views.ArticlesApi),
    url(r'^article/([0-9]+)$',views.ArticlesApi),

    url(r'^student$',views.studentApi),
    url(r'^student/([0-9]+)$',views.studentApi)

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)