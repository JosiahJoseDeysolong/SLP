from django.urls import path
from . import views


urlpatterns = [
    path('', views.slpapis, name="slp" ),

    path('year-list/', views.schoolyearList, name="year-list" ),
    path('year-detail/<str:pk>/', views.schoolyearDetail, name="year-detail" ),

    path('article-list/', views.articleList, name="article-list" ),
    path('article-detail/<str:pk>/', views.articleDetail, name="article-detail" ),

    path('sem-list/', views.semList, name="sem-list" ),
    path('sem-detail/<str:pk>/', views.semDetail, name="sem-detail" ),


    path('col-list/', views.colList, name="col-list" ),
    path('col-detail/<str:pk>/', views.colDetail, name="col-detail" ),


    path('gal-list/', views.gallList, name="gal-list" ),
    path('gal-detail/<str:pk>/', views.gallDetail, name="gal-detail" ),


    path('pict-list/', views.pictList, name="pict-list" ),
    path('pict-detail/<str:pk>/', views.pictDetail, name="pict-detail" ),


    path('proj-list/', views.projList, name="proj-list" ),
    path('proj-detail/<str:pk>/', views.projDetail, name="proj-detail" ),


    path('beni-list/', views.beniList, name="beni-list" ),
    path('beni-detail/<str:pk>/', views.beniDetail, name="beni-detail" ),

    path('coord-list/', views.coordList, name="coord-list" ),
    path('coord-detail/<str:pk>/', views.coordDetail, name="coord-detail" ),


    path('dean-list/', views.deanList, name="dean-list" ),
    path('dean-detail/<str:pk>/', views.deanDetail, name="dean-detail" ),


    path('propic-list/', views.propicList, name="propic-list" ),
    path('propic-detail/<str:pk>/', views.propicDetail, name="propic-detail" ),


    path('facul-list/', views.faculList, name="facul-list" ),
    path('facul-detail/<str:pk>/', views.faculDetail, name="facul-detail" ),
   

    path('partner-list/', views.partnerList, name="partner-list" ),
    path('partner-detail/<str:pk>/', views.partnerDetail, name="partner-detail" ),

    path('sdg-list/', views.sdgList, name="sdg-list" ),
    path('sdg-detail/<str:pk>/', views.sdgDetail, name="sdg-detail" ),
]