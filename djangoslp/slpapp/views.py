from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from slpapp.models import *
from slpapp.serializers import *
from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def BeneficiarieAPI(request,id=0):
    if request.method=='GET':
        benef = Beneficiaries.objects.all()
        benef_serializer=BeneficiariesSerializer(benef,many=True)
        return JsonResponse(benef_serializer.data,safe=False)
    
    elif request.method=='POST':
        benef_data=JSONParser().parse(request)
        benef_serializer=BeneficiariesSerializer(data=benef_data)
        if benef_serializer.is_valid():
            benef_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        benef_data=JSONParser().parse(request)
        benef=Projects.objects.get(benificariId=benef_data['benificariId'])
        benef_serializer=ProjectSerializer(benef,data=benef_data)
        if benef_serializer.is_valid():
            benef_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        benef=Projects.objects.get(benificariId=id)
        benef.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def projectApi(request,id=0):
    if request.method=='GET':
        projects = Projects.objects.all()
        projects_serializer=ProjectSerializer(projects,many=True)
        return JsonResponse(projects_serializer.data,safe=False)
    elif request.method=='POST':
        project_data=JSONParser().parse(request)
        projects_serializer=ProjectSerializer(data=project_data)
        if projects_serializer.is_valid():
            projects_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        project_data=JSONParser().parse(request)
        project=Projects.objects.get(projectId=project_data['projectId'])
        projects_serializer=ProjectSerializer(project,data=project_data)
        if projects_serializer.is_valid():
            projects_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method=='DELETE':
        project=Projects.objects.get(projectId=id)
        project.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def studentApi(request,id=0):
    if request.method=='GET':
        students = Students.objects.all()
        students_serializer=StudentSerializer(students,many=True)
        return JsonResponse(students_serializer.data,safe=False)
    
    elif request.method=='POST':
        student_data=JSONParser().parse(request)
        students_serializer=StudentSerializer(data=student_data)
        if students_serializer.is_valid():
            students_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        student_data=JSONParser().parse(request)
        student=Students.objects.get(studentId=student_data['studentId'])
        students_serializer=StudentSerializer(student,data=student_data)
        if students_serializer.is_valid():
            students_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        student=Students.objects.get(studentId=id)
        student.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def GalleryApi(request,id=0):
    if request.method=='GET':
        pictures = Gallery.objects.all()
        gallery_serializer=GallerySerializer(pictures,many=True)
        return JsonResponse(gallery_serializer.data,safe=False)
    
    elif request.method=='POST':
        gallery_data=JSONParser().parse(request)
        gallery_serializer=GallerySerializer(data=gallery_data)
        if gallery_serializer.is_valid():
            gallery_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        gallery_data=JSONParser().parse(request)
        picture=Gallery.objects.get(pcitireId=gallery_data['pcitireId'])
        gallery_serializer=GallerySerializer(picture,data=gallery_data)
        if gallery_serializer.is_valid():
            gallery_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        picture=Gallery.objects.get(pcitireId=id)
        picture.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def FacultyApi(request,id=0):
    if request.method=='GET':
        faculty = Faculty.objects.all()
        faculty_serializer=FacultySerializer(faculty,many=True)
        return JsonResponse(faculty_serializer.data,safe=False)
    
    elif request.method=='POST':
        faculty_data=JSONParser().parse(request)
        faculty_serializer=FacultySerializer(data=faculty_data)
        if faculty_serializer.is_valid():
            faculty_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        faculty_data=JSONParser().parse(request)
        faculty=Faculty.objects.get(facultyId=faculty_data['facultyId'])
        faculty_serializer=FacultySerializer(faculty,data=faculty_data)
        if faculty_serializer.is_valid():
            faculty_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        faculty=Faculty.objects.get(facultyId=id)
        faculty.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def PartnerApi(request,id=0):
    if request.method=='GET':
        partner = Partner.objects.all()
        partner_serializer=PartnerSerializer(partner,many=True)
        return JsonResponse(partner_serializer.data,safe=False)
    
    elif request.method=='POST':
        partner_data=JSONParser().parse(request)
        partner_serializer=PartnerSerializer(data=partner_data)
        if partner_serializer.is_valid():
            partner_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        partner_data=JSONParser().parse(request)
        partner=Partner.objects.get(partnerId=partner_data['partnerId'])
        partner_serializer=PartnerSerializer(partner,data=partner_data)
        if partner_serializer.is_valid():
            partner_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        partner=Partner.objects.get(partnerId=id)
        partner.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def ReportsApi(request,id=0):
    if request.method=='GET':
        report = Reports.objects.all()
        report_serializer=ReportsSerializer(report,many=True)
        return JsonResponse(report_serializer.data,safe=False)
    
    elif request.method=='POST':
        report_data=JSONParser().parse(request)
        report_serializer=ReportsSerializer(data=report_data)
        if report_serializer.is_valid():
            report_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        report_data=JSONParser().parse(request)
        report=Reports.objects.get(reportId=report_data['reportId'])
        report_serializer=ReportsSerializer(report,data=report_data)
        if report_serializer.is_valid():
            report_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        report=Reports.objects.get(reportId=id)
        report.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def ArticlesApi(request,id=0):
    if request.method=='GET':
        article = Articles.objects.all()
        article_serializer=ArticlesSerializer(article,many=True)
        return JsonResponse(article_serializer.data,safe=False)
    
    elif request.method=='POST':
        article_data=JSONParser().parse(request)
        article_serializer=ArticlesSerializer(data=article_data)
        if article_serializer.is_valid():
            article_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        article_data=JSONParser().parse(request)
        article=Articles.objects.get(articleId=article_data['articleId'])
        article_serializer=ArticlesSerializer(article,data=article_data)
        if article_serializer.is_valid():
            article_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    
    elif request.method=='DELETE':
        article=Articles.objects.get(partnerId=id)
        article.delete()
        return JsonResponse("Deleted Successfully",safe=False)