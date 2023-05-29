from django.shortcuts import render
from rest_framework.decorators import api_view

from rest_framework.response import Response
 
from .serializers import (
    SchoolYearSerializer, ArticleSerializer, SemesterSerializer, CollegeSerializer,
    ProjectSerializer, BeneficiarySerializer, StudentSerializer, CoordinatorSerializer, DeanSerializer,
    ProjectPictureSerializer, FacultySerializer, PartnerSerializer, SDGSerializer, GallerySerializer, PictureSerializer
)

from ..models import (
    SchoolYear, Article, Semester, College,
    Project, Beneficiary, Student, Coordinator, Dean,
    ProjectPicture, Faculty, Partner, SDG, Gallery, Picture
)


@api_view(['GET'])
def slpapis(request):
    api_urls = {
        'List':'/"table"-list/',
        'Details':'/"table"-detail/<str:pk>/',
    }
    return Response(api_urls)

# ------------------------------ #

# below is to get school year tables

# ------------------------------ #

@api_view(['GET'])
def schoolyearList(request):    
    schoolyear = SchoolYear.objects.all()
    serializer = SchoolYearSerializer(schoolyear, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def schoolyearDetail(request, pk):
    schoolyear = SchoolYear.objects.get(idSy=pk)
    serializer = SchoolYearSerializer(schoolyear, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get article tables

# ------------------------------ #

@api_view(['GET'])
def articleList(request):    
    article = Article.objects.all()
    serializer = ArticleSerializer(article, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def articleDetail(request, pk):
    article = Article.objects.get(idAr=pk)
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get semester tables

# ------------------------------ #

@api_view(['GET'])
def semList(request):    
    semester = Semester.objects.all()
    serializer = SemesterSerializer(semester, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def semDetail(request, pk):
    semester = Semester.objects.get(idSe=pk)
    serializer = SemesterSerializer(semester, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get college tables

# ------------------------------ #

@api_view(['GET'])
def colList(request):    
    college = College.objects.all()
    serializer = CollegeSerializer(college, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def colDetail(request, pk):
    college = Semester.objects.get(idCol=pk)
    serializer = CollegeSerializer(college, many=False)
    return Response(serializer.data)


# ------------------------------ #

# below is to get gallery tables

# ------------------------------ #

@api_view(['GET'])
def gallList(request):    
    gallery = Gallery.objects.all()
    serializer = GallerySerializer(gallery, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def gallDetail(request, pk):
    gallery = Gallery.objects.get(idGa=pk)
    serializer = GallerySerializer(gallery, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get picture tables

# ------------------------------ #

@api_view(['GET'])
def pictList(request):    
    picture = Picture.objects.all()
    serializer = PictureSerializer(picture, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pictDetail(request, pk):
    picture = Picture.objects.get(idPi=pk)
    serializer = PictureSerializer(picture, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get project tables

# ------------------------------ #

@api_view(['GET'])
def projList(request):    
    project = Project.objects.all()
    serializer = ProjectSerializer(project, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def projDetail(request, pk):
    project = Project.objects.get(idPr=pk)
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get benif tables

# ------------------------------ #

@api_view(['GET'])
def beniList(request):    
    benif = Beneficiary.objects.all()
    serializer = BeneficiarySerializer(benif, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def beniDetail(request, pk):
    benif = Beneficiary.objects.get(idBe=pk)
    serializer = BeneficiarySerializer(benif, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get student tables

# ------------------------------ #

@api_view(['GET'])
def studList(request):    
    student = Student.objects.all()
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studDetail(request, pk):
    student = Student.objects.get(idSt=pk)
    serializer = StudentSerializer(student, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get coordinator  tables

# ------------------------------ #

@api_view(['GET'])
def coordList(request):    
    coordi = Coordinator.objects.all()
    serializer = CoordinatorSerializer(coordi, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def coordDetail(request, pk):
    coordi = Coordinator.objects.get(idCoor=pk)
    serializer = CoordinatorSerializer(coordi, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get dean  tables

# ------------------------------ #

@api_view(['GET'])
def deanList(request):    
    dean = Dean.objects.all()
    serializer = DeanSerializer(dean, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def deanDetail(request, pk):
    dean = Dean.objects.get(idDe=pk)
    serializer = DeanSerializer(dean, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get project picture tables

# ------------------------------ #

@api_view(['GET'])
def propicList(request):    
    projpic = ProjectPicture.objects.all()
    serializer = ProjectPictureSerializer(projpic, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def propicDetail(request, pk):
    projpic = ProjectPicture.objects.get(idPP=pk)
    serializer = ProjectPictureSerializer(projpic, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get faculty tables

# ------------------------------ #

@api_view(['GET'])
def faculList(request):    
    faculty = Faculty.objects.all()
    serializer = FacultySerializer(faculty, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def faculDetail(request, pk):
    faculty = Faculty.objects.get(idFa=pk)
    serializer = FacultySerializer(faculty, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get partner tables

# ------------------------------ #

@api_view(['GET'])
def partnerList(request):    
    partner = Partner.objects.all()
    serializer = PartnerSerializer(partner, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def partnerDetail(request, pk):
    partner = Partner.objects.get(idPa=pk)
    serializer = PartnerSerializer(partner, many=False)
    return Response(serializer.data)

# ------------------------------ #

# below is to get sdg tables

# ------------------------------ #

@api_view(['GET'])
def sdgList(request):    
    sdg = SDG.objects.all()
    serializer = SDGSerializer(sdg, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def sdgDetail(request, pk):
    sdg = SDG.objects.get(idSd=pk)
    serializer = SDGSerializer(sdg, many=False)
    return Response(serializer.data)