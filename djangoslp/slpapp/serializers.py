from rest_framework import serializers
from slpapp.models import *



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Students 
        fields=('__all__')

class BeneficiariesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Beneficiaries
        fields=('__all__')

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model=Gallery
        fields=('__all__')

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model=Faculty
        fields=('__all__')

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Partner
        fields=('__all__')
        
class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reports
        fields=('__all__')

class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Articles
        fields=('__all__')

class ProjectSerializer(serializers.ModelSerializer):
    beni = BeneficiariesSerializer(many=True, read_only=True)
    pict = GallerySerializer(many=True, read_only=True)
    class Meta:
        model=Projects 
        fields=('__all__')