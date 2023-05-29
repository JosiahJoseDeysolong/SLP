from rest_framework import serializers
from ..models import (
    SchoolYear, Article, Semester, College,
    Project, Beneficiary, Student, Coordinator, Dean,
    ProjectPicture, Faculty, Partner, SDG, Gallery, Picture
)


# ------------------------------ #

# below is should get  partial tables for public users

# ------------------------------ #

class SchoolYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolYear
        exclude = ['annual_slp_plan']
        

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        exclude = ['accomplishment_rate']

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        exclude = ['status', 'beneficiary', 'cmo63',
                   'project_output', 'student']

class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        exclude = ['idGa']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['idSt']

class CoordinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinator
        fields = '__all__'

class DeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dean
        fields = '__all__'

class ProjectPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectPicture
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        exclude = ['mou_sla']

class SDGSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = '__all__'


