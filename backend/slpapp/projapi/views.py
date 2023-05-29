from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status, generics
from django.db.models import Q, Count
from django.core import serializers

from .serializers import (
    SchoolYearSerializer, ArticleSerializer, 
    SemesterSerializer, CollegeSerializer,
    ProjectSerializer, BeneficiarySerializer, 
    StudentSerializer, CoordinatorSerializer, 
    DeanSerializer, ProjectPictureSerializer, 
    FacultySerializer, PartnerSerializer, 
    SDGSerializer, GallerySerializer, 
    PictureSerializer, SemesterSummarySerializer
)

from ..models import (
    SchoolYear, Article, 
    Semester, College,
    Project, Beneficiary, 
    Student, Coordinator, 
    Dean, ProjectPicture, 
    Faculty, Partner, 
    SDG, Gallery, 
    Picture
)

class AssignDeanView(APIView):
    def post(self, request, college_id):
        try:
            college = College.objects.get(idCol=college_id)
            dean_id = request.data.get('dean_id')
            dean = Dean.objects.get(idDe=dean_id)
            college.dean = dean
            college.save()
            return Response({'message': 'Dean assigned successfully'}, status=status.HTTP_200_OK)
        except College.DoesNotExist:
            return Response({'error': 'College not found'}, status=status.HTTP_404_NOT_FOUND)
        except Dean.DoesNotExist:
            return Response({'error': 'Dean not found'}, status=status.HTTP_404_NOT_FOUND)

class AssignCoordinatorView(APIView):
    def post(self, request, college_id):
        try:
            college = College.objects.get(idCol=college_id)
            coordinator_id = request.data.get('coordinator_id')
            coordinator = Coordinator.objects.get(idCoor=coordinator_id)
            college.coordinator = coordinator
            college.save()
            return Response({'message': 'Coordinator assigned successfully'}, status=status.HTTP_200_OK)
        except College.DoesNotExist:
            return Response({'error': 'College not found'}, status=status.HTTP_404_NOT_FOUND)
        except Coordinator.DoesNotExist:
            return Response({'error': 'Coordinator not found'}, status=status.HTTP_404_NOT_FOUND)
        
class SemesterSummaryAPIView(generics.RetrieveAPIView):
    serializer_class = SemesterSummarySerializer
    queryset = Semester.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        semester_id = self.kwargs['semester_id']
        context['semester_id'] = semester_id
        return context

    def get_object(self):
        semester_id = self.kwargs['semester_id']
        queryset = Semester.objects.annotate(
            unique_academic_programs=Count('project__academic_program', distinct=True),
            total_students=Count('project__student', distinct=True),
            total_projects=Count('project', distinct=True),
            ongoing_projects=Count('project', filter=Q(project__status='Ongoing'), distinct=True),
            completed_projects=Count('project', filter=Q(project__status='Completed'), distinct=True)
        )
        return get_object_or_404(queryset, idSe=semester_id)
    
@api_view(['GET'])
def get_student_names(request, idPr):
    try:
        project = Project.objects.get(idPr=idPr)  # Get the project based on the project ID
        students = project.student.all() 
        
        student_data = []
        for student in students:
            student_data.append({
                'first_name': student.student_first_name,
                'last_name': student.student_last_name,
                'middle_name': student.student_middle_name,
                'pre_sl': student.pre_sl,
                'post_sl': student.post_sl,
                'idSt': student.idSt,
                'cmo': student.cmo.url if student.cmo else None
            })
        
        return Response({'students': student_data})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)

@api_view(['GET'])
def search_projects(request):
    query = request.GET.get('query', '')  # Get the search query from the request
    
    # Perform the search using Q objects and the icontains lookup
    projects = Project.objects.filter(Q(project_name__icontains=query) )
    
    # Serialize the projects along with the related fields' data
    project_data = []
    for project in projects:
        project_data.append({
            'project_name': project.project_name,
            'project_description': project.project_description,
            'status': project.status,
            'sl': project.sl,
            'subject_hosted': project.subject_hosted,
            'academic_program': project.academic_program,
            'project_output': project.project_output.url if project.project_output else None,
            'cmo63': project.cmo63.url if project.cmo63 else None,
            'school_year': {
                'year_name': project.school_year.year_name,
                'annual_slp_plan': project.school_year.annual_slp_plan.url if project.school_year.annual_slp_plan else None
            },
            'semester': {
                'semester_name': project.semester.semester_name,
                'accomplishment_rate': project.semester.accomplishment_rate
            },
            'college': {
                'college_name': project.college.college_name,
                'coordinator': {
                    'coor_first_name': project.college.coordinator.coor_first_name if project.college.coordinator else None,
                    'coor_last_name': project.college.coordinator.coor_last_name if project.college.coordinator else None,
                    'coor_middle_name': project.college.coordinator.coor_middle_name if project.college.coordinator else None
                },
                'dean': {
                    'dean_first_name': project.college.dean.dean_first_name if project.college.dean else None,
                    'dean_last_name': project.college.dean.dean_last_name if project.college.dean else None,
                    'dean_middle_name': project.college.dean.dean_middle_name if project.college.dean else None
                }
            },
            'partner': {
                'partner_name': project.partner.partner_name if project.partner else None,
                'partner_location': project.partner.partner_location if project.partner else None,
                'partner_description': project.partner.partner_description if project.partner else None,
                'mou_sla': project.partner.mou_sla.url if project.partner and project.partner.mou_sla else None
            },
            'beneficiary': [{
                'benificary_name': beneficiary.benificary_name,
                'benificary_description': beneficiary.benificary_description
            } for beneficiary in project.beneficiary.all()],
            'student': [{
                'student_first_name': student.student_first_name,
                'student_last_name': student.student_last_name,
                'student_middle_name': student.student_middle_name,
                'pre_sl': student.pre_sl,
                'post_sl': student.post_sl,
                'cmo': student.cmo.url if student.cmo else None
            } for student in project.student.all()],
            'faculty': [{
                'faculty_first_name': faculty.faculty_first_name,
                'faculty_last_name': faculty.faculty_last_name,
                'faculty_middle_name': faculty.faculty_middle_name
            } for faculty in project.faculty.all()],
            'sdg': [{
                'sdg_name': sdg.sdg_name,
                'sdg_pic': sdg.sdg_pic.url if sdg.sdg_pic else None
            } for sdg in project.sdg.all()],
            'pictures': [{
                'project_picture': picture.project_picture.url if picture.project_picture else None
            } for picture in project.pictures.all()]
        })
    
    return Response(project_data)


# ------------------------------ #

# search deans 

# ------------------------------ #

from django.db.models import Q

class DeanSearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(dean_first_name__istartswith=term) |
                          Q(dean_last_name__istartswith=term) |
                          Q(dean_middle_name__istartswith=term) |
                          Q(dean_first_name__icontains=term) |
                          Q(dean_last_name__icontains=term) |
                          Q(dean_middle_name__icontains=term))

        deans = Dean.objects.filter(q_objects)
        serializer = DeanSerializer(deans, many=True)
        return Response(serializer.data)
    

# ------------------------------ #

# search coordinator 

# ------------------------------ #


class CoorSearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(coor_first_name__istartswith=term) |
                          Q(coor_last_name__istartswith=term) |
                          Q(coor_middle_name__istartswith=term) |
                          Q(coor_first_name__icontains=term) |
                          Q(coor_last_name__icontains=term) |
                          Q(coor_middle_name__icontains=term))

        coors = Coordinator.objects.filter(q_objects)
        serializer = CoordinatorSerializer(coors, many=True)
        return Response(serializer.data)


# ------------------------------ #

# search faculty 

# ------------------------------ #

class FacuSearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(faculty_first_name__istartswith=term) |
                          Q(faculty_last_name__istartswith=term) |
                          Q(faculty_middle_name__istartswith=term) |
                          Q(faculty_first_name__icontains=term) |
                          Q(faculty_last_name__icontains=term) |
                          Q(faculty_middle_name__icontains=term))

        coors = Faculty.objects.filter(q_objects)
        serializer = FacultySerializer(coors, many=True)
        return Response(serializer.data)
    
# ------------------------------ #

# search student

# ------------------------------ #

class StudentSearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(student_first_name__istartswith=term) |
                          Q(student_last_name__istartswith=term) |
                          Q(student_middle_name__istartswith=term) |
                          Q(student_first_name__icontains=term) |
                          Q(student_last_name__icontains=term) |
                          Q(student_middle_name__icontains=term))

        coors = Student.objects.filter(q_objects)
        serializer = StudentSerializer(coors, many=True)
        return Response(serializer.data)

class BeneficiarySearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(benificary_name__istartswith=term))

        benif = Beneficiary.objects.filter(q_objects)
        serializer = BeneficiarySerializer(benif, many=True)
        return Response(serializer.data)

class PartnerSearchView(APIView):
    def get(self, request, format=None):
        search_query = request.query_params.get('q', '')
        search_terms = search_query.split()

        q_objects = Q()
        for term in search_terms:
            q_objects |= (Q(partner_name__istartswith=term))

        benif = Partner.objects.filter(q_objects)
        serializer = PartnerSerializer(benif, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def slpapis(request):
    api_urls = {
        'List':'/"table"-list/',
        'Details':'/"table"-detail/<str:pk>/',
    }
    return Response(api_urls)

# ------------------------------ #

# auto creates structure for collges and years

# ------------------------------ #


@api_view(['POST'])
def create_school_year(request):
    year_name = request.data.get('year_name')

    if year_name:
        with transaction.atomic():
            # Create the SchoolYear table
            school_year = SchoolYear.objects.create(year_name=year_name)

            # Create the Semester tables
            semesters = [
                Semester(school_year=school_year, semester_name='First Semester'),
                Semester(school_year=school_year, semester_name='Second Semester'),
                Semester(school_year=school_year, semester_name='Intersession')
            ]
            Semester.objects.bulk_create(semesters)

            # Retrieve the created semesters
            created_semesters = Semester.objects.filter(school_year=school_year)

            # Create the College tables for each semester
            colleges = []
            for semester in created_semesters:
                colleges.extend([
                    College(school_year=school_year, semester=semester, college_name='College of Agriculture'),
                    College(school_year=school_year, semester=semester, college_name='College of Arts and Sciences'),
                    College(school_year=school_year, semester=semester, college_name='College of Computer Studies'),
                    College(school_year=school_year, semester=semester, college_name='College of Engineering'),
                    College(school_year=school_year, semester=semester, college_name='College of Nursing'),
                    College(school_year=school_year, semester=semester, college_name='School of Business and Management'),
                    College(school_year=school_year, semester=semester, college_name='School of Education'),
                    College(school_year=school_year, semester=semester, college_name='Professional Schools')
                ])

            College.objects.bulk_create(colleges)

        return Response({'message': 'SchoolYear, Semesters, and Colleges created successfully.'})
    else:
        return Response({'error': 'Invalid input.'}, status=400)
    
# ------------------------------ #

# file uploads to school year annual plan

# ------------------------------ #
 




# ------------------------------ #

# query for number of students in a project

# ------------------------------ #
@api_view(['GET'])
def get_number_of_students(request, project_id):
    try:
        project = Project.objects.get(idPr=project_id)
        num_students = project.student.count()
        return Response({'number_of_students': num_students})
    except Project.DoesNotExist:
        return Response({'error': 'Invalid Project ID.'}, status=400)
    

class StudentsNotInProjectView(APIView):
    def get(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
            students = Student.objects.exclude(project=project)
            serializer = StudentSerializer(students, many=True)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)
        

class AssignStudentToProject(APIView):
    def post(self, request):
        project_id = request.data.get('project_id')
        student_id = request.data.get('student_id')

        try:
            project = Project.objects.get(pk=project_id)
            student = Student.objects.get(pk=student_id)
            project.student.add(student) 
            return Response({'message': 'Student assigned to the project successfully.'})
        except (Project.DoesNotExist, Student.DoesNotExist):
            return Response({'error': 'Project or student does not exist.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

class UnassignStudentFromProject(APIView):
    def post(self, request):
        project_id = request.data.get('project_id')
        student_id = request.data.get('student_id')

        try:
            project = Project.objects.get(pk=project_id)
            student = Student.objects.get(pk=student_id)
            project.student.remove(student) 
            return Response({'message': 'Student unassigned from the project successfully.'})
        except (Project.DoesNotExist, Student.DoesNotExist):
            return Response({'error': 'Project or student does not exist.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

# ----- faculty assign


@api_view(['GET'])
def get_faculty_names(request, idPr):
    try:
        project = Project.objects.get(idPr=idPr)   
        faculty = project.faculty.all()    
        
        faculty_data = []
        for faculty in faculty:
            faculty_data.append({
                'first_name': faculty.faculty_first_name,
                'last_name': faculty.faculty_last_name,
                'middle_name': faculty.faculty_middle_name,
                'idSt': faculty.idFa,
             })
        
        return Response({'faculty': faculty_data})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)



class FacultyNotInProjectView(APIView):
    def get(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
            faculty = Faculty.objects.exclude(project=project)
            serializer = FacultySerializer(faculty, many=True)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)
        


class AssignFacultyToProject(APIView):
    def post(self, request):
        project_id = request.data.get('project_id')
        faculty_id = request.data.get('faculty_id')

        try:
            project = Project.objects.get(pk=project_id)
            faculty = Faculty.objects.get(pk=faculty_id)
            project.faculty.add(faculty) 
            return Response({'message': 'Faculty assigned to the project successfully.'})
        except (Project.DoesNotExist, Faculty.DoesNotExist):
            return Response({'error': 'Project or faculty does not exist.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

class UnassignFacultyFromProject(APIView):
    def post(self, request):
        project_id = request.data.get('project_id')
        faculty_id = request.data.get('faculty_id')

        try:
            project = Project.objects.get(pk=project_id)
            faculty = Faculty.objects.get(pk=faculty_id)
            project.faculty.remove(faculty) 
            return Response({'message': 'Faculty unassigned from the project successfully.'})
        except (Project.DoesNotExist, Faculty.DoesNotExist):
            return Response({'error': 'Project or faculty does not exist.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        


@api_view(['GET'])
def get_partner_detail(request, idPr):
    try:
        project = Project.objects.get(idPr=idPr)   
        partner = project.partner   
        partner_data = {
            'partner_name': partner.partner_name,
            'partner_location': partner.partner_location,
            'partner_description': partner.partner_description,
            'idPa': partner.idPa,
        }
        
        return Response({'partner': partner_data})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)
    

class AssignPartnerView(APIView):
    def put(self, request, project_id, partner_id):
        try:
            project = Project.objects.get(pk=project_id)
            partner = Partner.objects.get(pk=partner_id)
            project.partner = partner
            project.save()
            return Response({'message': 'Partner assigned successfully'})
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)
        except Partner.DoesNotExist:
            return Response({'error': 'Partner not found'}, status=404)    


class PartnerNotInProjectView(APIView):
    def get(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
            partners = Partner.objects.exclude(project=project)
            serializer = PartnerSerializer(partners, many=True)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)

