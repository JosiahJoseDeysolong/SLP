from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from django.db import IntegrityError
from django.http import FileResponse
import os
from django.conf import settings

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


from ..generate_reports.generate_ProjectSummaryReport import generate_PSR



@api_view(['GET'])
def slpapis(request):
    api_urls = {
        'List':'/"table"-list/',
        'Details':'/"table"-detail/<str:pk>/',
        'Create':'/"table"-create/',
        'Update':'/"table"-update/<str:pk>/',
        'Delete':'/"table"-delete/<str:pk>/',
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

@api_view(['POST'])
def schoolyearCreate(request):
    serializer = SchoolYearSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def schoolyearUpdate(request, pk):
    schoolyear = SchoolYear.objects.get(idSy=pk)
    serializer = SchoolYearSerializer(instance=schoolyear, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def schoolyearDelete(request, pk):
    schoolyear = SchoolYear.objects.get(idSy=pk)
    schoolyear.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def articleCreate(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def articleUpdate(request, pk):
    article = Article.objects.get(idAr=pk)
    serializer = ArticleSerializer(instance=article, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def articleDelete(request, pk):
    article = Article.objects.get(idAr=pk)
    article.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def semCreate(request):
    serializer = SemesterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def semUpdate(request, pk):
    semester = Semester.objects.get(idSe=pk)
    serializer = SemesterSerializer(instance=semester, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def semDelete(request, pk):
    semester = Semester.objects.get(idSe=pk)
    semester.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def colCreate(request):
    serializer = CollegeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def colUpdate(request, pk):
    college = Semester.objects.get(idCol=pk)
    serializer = CollegeSerializer(instance=college, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def colDelete(request, pk):
    college = College.objects.get(idCol=pk)
    college.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def gallCreate(request):
    serializer = GallerySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def gallUpdate(request, pk):
    gallery = Gallery.objects.get(idGa=pk)
    serializer = GallerySerializer(instance=gallery, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def gallDelete(request, pk):
    gallery = Gallery.objects.get(idGa=pk)
    gallery.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def pictCreate(request):
    serializer = PictureSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def pictUpdate(request, pk):
    picture = Picture.objects.get(idPi=pk)
    serializer = PictureSerializer(instance=picture, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def pictDelete(request, pk):
    picture = Picture.objects.get(idPi=pk)
    picture.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def projCreate(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def projUpdate(request, pk):
    project = Project.objects.get(idPr=pk)
    serializer = ProjectSerializer(instance=project, data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    except IntegrityError as e:
        return Response({'error': 'Duplicate project name for the college'}, status=400)
    except Exception as e:
        return Response({'error': 'Something went wrong'}, status=500)

@api_view(['DELETE'])
def projDelete(request, pk):
    project = Project.objects.get(idPr=pk)
    project.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def beniCreate(request):
    serializer = BeneficiarySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def beniUpdate(request, pk):
    benif = Beneficiary.objects.get(idBe=pk)
    serializer = BeneficiarySerializer(instance=benif, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def beniDelete(request, pk):
    benif = Beneficiary.objects.get(idBe=pk)
    benif.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def studCreate(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def studUpdate(request, pk):
    student = Student.objects.get(idSt=pk)
    serializer = StudentSerializer(instance=student, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def studDelete(request, pk):
    student = Student.objects.get(idSt=pk)
    student.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def coordCreate(request):
    serializer = CoordinatorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def coordUpdate(request, pk):
    coordi = Coordinator.objects.get(idCoor=pk)
    serializer = CoordinatorSerializer(instance=coordi, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def coordDelete(request, pk):
    coordi = Coordinator.objects.get(idCoor=pk)
    coordi.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def deanCreate(request):
    serializer = DeanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def deanUpdate(request, pk):
    dean = Dean.objects.get(idDe=pk)
    serializer = DeanSerializer(instance=dean, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deanDelete(request, pk):
    dean = Dean.objects.get(idDe=pk)
    dean.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def propicCreate(request):
    serializer = ProjectPictureSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def propicUpdate(request, pk):
    projpic = ProjectPicture.objects.get(idPP=pk)
    serializer = ProjectPictureSerializer(instance=projpic, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def propicDelete(request, pk):
    projpic = ProjectPicture.objects.get(idPP=pk)
    projpic.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def faculCreate(request):
    serializer = FacultySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def faculUpdate(request, pk):
    faculty = Faculty.objects.get(idFa=pk)
    serializer = FacultySerializer(instance=faculty, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def faculDelete(request, pk):
    benif = Faculty.objects.get(idFa=pk)
    benif.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def partnerCreate(request):
    serializer = PartnerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def partnerUpdate(request, pk):
    partner = Partner.objects.get(idPa=pk)
    serializer = PartnerSerializer(instance=partner, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def partnerDelete(request, pk):
    partner = Partner.objects.get(idPa=pk)
    partner.delete()
    return Response("Deleted")

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

@api_view(['POST'])
def sdgCreate(request):
    serializer = SDGSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def sdgUpdate(request, pk):
    sdg = SDG.objects.get(idSd=pk)
    serializer = SDGSerializer(instance=sdg, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def sdgDelete(request, pk):
    sdg = SDG.objects.get(idSd=pk)
    sdg.delete()
    return Response("Deleted")



# --------------------------- #

# code for connecting to the generating of proj summary reports

# --------------------------- #
 
@api_view(['GET'])
def psrGenerate(request, pk):    # ProjectSummaryReport
    project = Project.objects.get(idPr=pk)
    serializer = ProjectSerializer(project, many=False)

    try:
        col = College.objects.get(idCol=serializer.data['college'])
        col_ser = CollegeSerializer(col)
        college = col_ser.data['college_name']
    except College.DoesNotExist:
        college = None  # Handle the case when the college does not exist

    try:
        par = Partner.objects.get(idPa=serializer.data['partner'])
        par_ser = PartnerSerializer(par)
        partner = par_ser.data['partner_name']
    except Partner.DoesNotExist:
        partner = None  # Handle the case when the partner does not exist

    response_data = {
        "project": serializer.data,
        "college": college,
        "partner": partner
    }

    generate_PSR(serializer.data, college, partner)

    # Construct the file path
    documentName = f"{serializer.data['project_name']}_Report.docx"
    documentPath = os.path.join(settings.BASE_DIR, documentName)

    # Check if the file exists
    if os.path.exists(documentPath):
        # Open the file in binary mode
        documentFile = open(documentPath, 'rb')

        # Create a FileResponse using the file object
        response = FileResponse(documentFile, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = f'attachment; filename="{documentName}"'
        return response
    else:
        return Response({"message": "Document not found."})