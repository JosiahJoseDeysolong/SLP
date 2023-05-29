from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import SchoolYear, Project
from .serializers import SchoolYearSerializer, ProjectSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import HttpResponse
import mimetypes
from rest_framework import status
from rest_framework import viewsets
from django.core.exceptions import ObjectDoesNotExist

 

class ProjectImageView(APIView):
    def get(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if project.project_detail_picture and project.project_detail_picture.url:
                image_url = project.project_detail_picture.url
                return Response({'image_url': image_url})
            else:
                return Response({'error': 'No image associated with the project.'}, status=status.HTTP_404_NOT_FOUND)
        except ObjectDoesNotExist:
            return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, idPr):
        project = Project.objects.get(idPr=idPr)
        project.project_detail_picture = request.FILES.get('project_detail_picture')
        project.save()
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, idPr):
        project = Project.objects.get(idPr=idPr)
        project.project_detail_picture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




  
class SchoolYearFileView(APIView):
    authentication_classes = [] 
    
    def get(self, request, idSy):
        try:
            school_year = SchoolYear.objects.get(idSy=idSy)
            if school_year.annual_slp_plan:
                file_path = school_year.annual_slp_plan.path
                with open(file_path, 'rb') as file:
                    response = HttpResponse(file, content_type=mimetypes.guess_type(file_path)[0])
                    response['Content-Disposition'] = 'attachment; filename=' + school_year.annual_slp_plan.name
                    return response
            else:
                return Response(status=404)
        except SchoolYear.DoesNotExist:
            return Response(status=404)

    def delete(self, request, idSy):
        try:
            school_year = SchoolYear.objects.get(idSy=idSy)
            if school_year.annual_slp_plan:
                # Delete the file if it exists
                school_year.annual_slp_plan.delete(save=True)
            school_year.annual_slp_plan = None
            school_year.save()
            return Response(status=204)
        except SchoolYear.DoesNotExist:
            return Response(status=404)

    def put(self, request, idSy):
        try:
            school_year = SchoolYear.objects.get(idSy=idSy)
            if 'file' in request.FILES:
                # Delete the old file if it exists
                if school_year.annual_slp_plan:
                    school_year.annual_slp_plan.delete(save=True)
                school_year.annual_slp_plan = request.FILES['file']
                school_year.save()
                serializer = SchoolYearSerializer(school_year)
                return Response(serializer.data)
            else:
                return Response(status=400, data={'error': 'No file provided.'})
        except SchoolYear.DoesNotExist:
            return Response(status=404)



class ProjectCmoFileView(APIView):
    authentication_classes = [] 
    
    def get(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if project.cmo63:
                file_path = project.cmo63.path
                with open(file_path, 'rb') as file:
                    response = HttpResponse(file, content_type=mimetypes.guess_type(file_path)[0])
                    response['Content-Disposition'] = 'attachment; filename=' + project.cmo63.name
                    return response
            else:
                return Response(status=404)
        except Project.DoesNotExist:
            return Response(status=404)

    def delete(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if project.cmo63:
                # Delete the file if it exists
                project.cmo63.delete(save=True)
            project.cmo63 = None
            project.save()
            return Response(status=204)
        except Project.DoesNotExist:
            return Response(status=404)

    def put(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if 'file' in request.FILES:
                # Delete the old file if it exists
                if project.cmo63:
                    project.cmo63.delete(save=True)
                project.cmo63 = request.FILES['file']
                project.save()
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
            else:
                return Response(status=400, data={'error': 'No file provided.'})
        except Project.DoesNotExist:
            return Response(status=404)
        

class ProjectOutputFileView(APIView):
    authentication_classes = [] 
    
    def get(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if project.project_output:
                file_path = project.project_output.path
                with open(file_path, 'rb') as file:
                    response = HttpResponse(file, content_type=mimetypes.guess_type(file_path)[0])
                    response['Content-Disposition'] = 'attachment; filename=' + project.project_output.name
                    return response
            else:
                return Response(status=404)
        except Project.DoesNotExist:
            return Response(status=404)

    def delete(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if project.project_output:
                # Delete the file if it exists
                project.project_output.delete(save=True)
            project.project_output = None
            project.save()
            return Response(status=204)
        except Project.DoesNotExist:
            return Response(status=404)

    def put(self, request, idPr):
        try:
            project = Project.objects.get(idPr=idPr)
            if 'file' in request.FILES:
                # Delete the old file if it exists
                if project.project_output:
                    project.project_output.delete(save=True)
                project.project_output = request.FILES['file']
                project.save()
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
            else:
                return Response(status=400, data={'error': 'No file provided.'})
        except Project.DoesNotExist:
            return Response(status=404)