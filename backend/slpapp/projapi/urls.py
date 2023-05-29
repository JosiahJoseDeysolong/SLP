from django.urls import path
from . import views 
from django.conf import settings
from django.conf.urls.static import static
from .api import (SchoolYearFileView, ProjectImageView, 
                  ProjectCmoFileView, ProjectOutputFileView)

from .views import (DeanSearchView, CoorSearchView,
                    FacuSearchView, StudentSearchView, 
                    BeneficiarySearchView, PartnerSearchView, 
                    AssignStudentToProject, UnassignStudentFromProject, 
                    StudentsNotInProjectView, SemesterSummaryAPIView, 
                    AssignDeanView, AssignCoordinatorView,
                    FacultyNotInProjectView, AssignFacultyToProject,
                    UnassignFacultyFromProject, AssignPartnerView,
                    PartnerNotInProjectView)

urlpatterns = [
    path('', views.slpapis, name="slp" ),
    path('auto-create-years/', views.create_school_year, name="auto-create-years" ),
    path('projects/<int:project_id>/students/count/', views.get_number_of_students, name="project-students-count"),
    path('api/school-year/<int:idSy>/file/', SchoolYearFileView.as_view(), name='school-year-file'),
    path('search-dean/', DeanSearchView.as_view(), name='search-dean'),
    path('search-coor/', CoorSearchView.as_view(), name='search-coor'),
    path('search-facu/', FacuSearchView.as_view(), name='search-facu'),
    path('search-student/', StudentSearchView.as_view(), name='search-student'),
    path('search-benif/', BeneficiarySearchView.as_view(), name='search-benif'),
    path('search-partner/', PartnerSearchView.as_view(), name='search-partner'),
    path('projects/<int:idPr>/image/', ProjectImageView.as_view(), name='project-image'),
    path('projects/<int:project_id>/students-not-in-project/', StudentsNotInProjectView.as_view(), name='students-not-in-project'),
    path('project-cmo/<int:idPr>/file/', ProjectCmoFileView.as_view(), name='project-cmo'),
    path('project-output/<int:idPr>/file/', ProjectOutputFileView.as_view(), name='project-output'),
    path('search-projects/', views.search_projects, name='search-projects'),

    path('get/<int:idPr>/students', views.get_student_names, name='get-student-names'),
    path('add-student-to-project/', AssignStudentToProject.as_view(), name='assign-student-to-project'),
    path('remove-student-from-project/', UnassignStudentFromProject.as_view(), name='unassign-student-from-project'),
    path('semesters/<int:semester_id>/summary/', SemesterSummaryAPIView.as_view(), name='semester-summary'),
    path('college/<int:college_id>/assign_dean/', AssignDeanView.as_view(), name='assign-dean'),
    path('college/<int:college_id>/assign_coordinator/', AssignCoordinatorView.as_view(), name='assign-coordinator'),

    path('get/<int:idPr>/faculty/', views.get_faculty_names, name='get-faculty-names'),
    path('projects/<int:project_id>/faculty-not-in-project/', FacultyNotInProjectView.as_view(), name='faculty-not-in-project'),
    path('add-faculty-to-project/', AssignFacultyToProject.as_view(), name='assign-faculty-to-project'),
    path('remove-faculty-from-project/', UnassignFacultyFromProject.as_view(), name='unassign-faculty-from-project'),

    path('get/<int:idPr>/partner/', views.get_partner_detail, name='get-faculty-names'),
    path('projects/<int:project_id>/assign-partner/<int:partner_id>/', AssignPartnerView.as_view(), name='assign_partner'),
    path('projects/<int:project_id>/partner-not-in-project/', PartnerNotInProjectView.as_view(), name='partner-not-in-project'),


]

urlpatterns += static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOT)