from django.urls import path
from . import views


urlpatterns = [
    path('', views.slpapis, name="slp" ),

    path('year-list/', views.schoolyearList, name="year-list" ),
    path('year-detail/<str:pk>/', views.schoolyearDetail, name="year-detail" ),
    path('year-create/', views.schoolyearCreate, name="year-create" ),
    path('year-update/<str:pk>/', views.schoolyearUpdate, name="year-update" ),
    path('year-delete/<str:pk>/', views.schoolyearDelete, name="year-delete" ),

    path('article-list/', views.articleList, name="article-list" ),
    path('article-detail/<str:pk>/', views.articleDetail, name="article-detail" ),
    path('article-create/', views.articleCreate, name="article-create" ),
    path('article-update/<str:pk>/', views.articleUpdate, name="article-update" ),
    path('article-delete/<str:pk>/', views.articleDelete, name="article-delete" ),
    
    path('sem-list/', views.semList, name="sem-list" ),
    path('sem-detail/<str:pk>/', views.semDetail, name="sem-detail" ),
    path('sem-create/', views.semCreate, name="sem-create" ),
    path('sem-update/<str:pk>/', views.semUpdate, name="sem-update" ),
    path('sem-delete/<str:pk>/', views.semDelete, name="sem-delete" ),

    path('col-list/', views.colList, name="col-list" ),
    path('col-detail/<str:pk>/', views.colDetail, name="col-detail" ),
    path('col-create/', views.colCreate, name="col-create" ),
    path('col-update/<str:pk>/', views.colUpdate, name="col-update" ),
    path('col-delete/<str:pk>/', views.colDelete, name="col-delete" ),

    path('gal-list/', views.gallList, name="gal-list" ),
    path('gal-detail/<str:pk>/', views.gallDetail, name="gal-detail" ),
    path('gal-create/', views.gallCreate, name="gal-create" ),
    path('gal-update/<str:pk>/', views.gallUpdate, name="gal-update" ),
    path('gal-delete/<str:pk>/', views.gallDelete, name="gal-delete" ),

    path('pict-list/', views.pictList, name="pict-list" ),
    path('pict-detail/<str:pk>/', views.pictDetail, name="pict-detail" ),
    path('pict-create/', views.pictCreate, name="pict-create" ),
    path('pict-update/<str:pk>/', views.pictUpdate, name="pict-update" ),
    path('pict-delete/<str:pk>/', views.pictDelete, name="pict-delete" ),

    path('proj-list/', views.projList, name="proj-list" ),
    path('proj-detail/<str:pk>/', views.projDetail, name="proj-detail" ),
    path('proj-create/', views.projCreate, name="proj-create" ),
    path('proj-update/<str:pk>/', views.projUpdate, name="proj-update" ),
    path('proj-delete/<str:pk>/', views.projDelete, name="proj-delete" ),

    path('beni-list/', views.beniList, name="beni-list" ),
    path('beni-detail/<str:pk>/', views.beniDetail, name="beni-detail" ),
    path('beni-create/', views.beniCreate, name="beni-create" ),
    path('beni-update/<str:pk>/', views.beniUpdate, name="beni-update" ),
    path('beni-delete/<str:pk>/', views.beniDelete, name="beni-delete" ),

    path('stud-list/', views.studList, name="stud-list" ),
    path('stud-detail/<str:pk>/', views.studDetail, name="stud-detail" ),
    path('stud-create/', views.studCreate, name="stud-create" ),
    path('stud-update/<str:pk>/', views.studUpdate, name="stud-update" ),
    path('stud-delete/<str:pk>/', views.studDelete, name="stud-delete" ),

    path('coord-list/', views.coordList, name="coord-list" ),
    path('coord-detail/<str:pk>/', views.coordDetail, name="coord-detail" ),
    path('coord-create/', views.coordCreate, name="coord-create" ),
    path('coord-update/<str:pk>/', views.coordUpdate, name="coord-update" ),
    path('coord-delete/<str:pk>/', views.coordDelete, name="coord-delete" ),

    path('dean-list/', views.deanList, name="dean-list" ),
    path('dean-detail/<str:pk>/', views.deanDetail, name="dean-detail" ),
    path('dean-create/', views.deanCreate, name="-create" ),
    path('dean-update/<str:pk>/', views.deanUpdate, name="dean-update" ),
    path('dean-delete/<str:pk>/', views.deanDelete, name="dean-delete" ),

    path('propic-list/', views.propicList, name="propic-list" ),
    path('propic-detail/<str:pk>/', views.propicDetail, name="propic-detail" ),
    path('propic-create/', views.propicCreate, name="propic-create" ),
    path('propic-update/<str:pk>/', views.propicUpdate, name="propic-update" ),
    path('propic-delete/<str:pk>/', views.propicDelete, name="propic-delete" ),

    path('facul-list/', views.faculList, name="facul-list" ),
    path('facul-detail/<str:pk>/', views.faculDetail, name="facul-detail" ),
    path('facul-create/', views.faculCreate, name="facul-create" ),
    path('facul-update/<str:pk>/', views.faculUpdate, name="facul-update" ),
    path('facul-delete/<str:pk>/', views.faculDelete, name="facul-delete" ),

    path('partner-list/', views.partnerList, name="partner-list" ),
    path('partner-detail/<str:pk>/', views.partnerDetail, name="partner-detail" ),
    path('partner-create/', views.partnerCreate, name="partner-create" ),
    path('partner-update/<str:pk>/', views.partnerUpdate, name="partner-update" ),
    path('partner-delete/<str:pk>/', views.partnerDelete, name="partner-delete" ),

    path('sdg-list/', views.sdgList, name="sdg-list" ),
    path('sdg-detail/<str:pk>/', views.sdgDetail, name="sdg-detail" ),
    path('sdg-create/', views.sdgCreate, name="sdg-create" ),
    path('sdg-update/<str:pk>/', views.sdgUpdate, name="sdg-update" ),
    path('sdg-delete/<str:pk>/', views.sdgDelete, name="sdg-delete" ),

    path('generatePSR/<int:pk>/', views.psrGenerate, name="psr-generate" ),

]
