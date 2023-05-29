from django.test import TestCase, RequestFactory
from django.urls import reverse
from .models import Article
from .publicapi import views as pub
from .privateapi import views as priv
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Project, Student, SchoolYear, Semester, College
from .privateapi.serializers import StudentSerializer
from rest_framework.test import APIRequestFactory
from .projapi.views import AssignStudentToProject, create_school_year
from .models import Gallery
from .privateapi.views import gallList, gallDetail, gallCreate, gallUpdate, gallDelete
 
 
class CreateSchoolYearTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_school_year_success(self):
         
        data = {
            'year_name': '2023-2024'
        }
         
        request = self.factory.post('/auto-create-years/', data)
        response = create_school_year(request)

         
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'message': 'SchoolYear, Semesters, and Colleges created successfully.'})

         
        school_year = SchoolYear.objects.get(year_name='2023-2024')
        semesters = Semester.objects.filter(school_year=school_year)
        colleges = College.objects.filter(school_year=school_year)

        self.assertEqual(semesters.count(), 3)
        self.assertEqual(colleges.count(), 24)

    def test_create_school_year_invalid_input(self):
         
        data = {}

         
        request = self.factory.post('/auto-create-years/', data)
        response = create_school_year(request)

  
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {'error': 'Invalid input.'})

     
        self.assertEqual(SchoolYear.objects.count(), 0)
        self.assertEqual(Semester.objects.count(), 0)
        self.assertEqual(College.objects.count(), 0)


class StudentsNotInProjectViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.school_year = SchoolYear.objects.create(year_name='2023-2024')     
        self.semester = Semester.objects.create(school_year=self.school_year, semester_name='First Semester')
    
        self.college = College.objects.create(school_year=self.school_year, semester=self.semester, college_name='College of Engineering')
        
        self.project = Project.objects.create(
            school_year=self.school_year,
            semester=self.semester,
            college=self.college,
            project_name='Test Project'
        )
        
        self.student1 = Student.objects.create(student_first_name='John', student_last_name='Doe')
        self.student2 = Student.objects.create(student_first_name='Jane', student_last_name='Smith')
        
        self.project.student.add(self.student1)
    
    def test_get_students_not_in_project(self):
        url = reverse('students-not-in-project', kwargs={'project_id': self.project.idPr})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        students = Student.objects.exclude(project=self.project)
        serializer = StudentSerializer(students, many=True)
        self.assertEqual(response.data, serializer.data)
    
    def test_get_students_not_in_nonexistent_project(self):
        nonexistent_project_id = 9999
        url = reverse('students-not-in-project', kwargs={'project_id': nonexistent_project_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'error': 'Project not found'})

 

class AssignStudentToProjectTest(TestCase):
    def setUp(self):
     
        self.school_year  = SchoolYear.objects.create(year_name='2023')
        self.semester = Semester.objects.create(semester_name='Spring')
        self.college = College.objects.create(college_name='Engineering')

     
        self.project = Project.objects.create(project_name='My Project', school_year =self.school_year , semester=self.semester, college=self.college)

       
        self.student = Student.objects.create(student_first_name='John Doe')

    
        self.factory = APIRequestFactory()

    def test_assign_student_to_project(self):
      
        data = {
            'project_id': self.project.idPr,
            'student_id': self.student.idSt
        }
        request = self.factory.post('/add-student-to-project/', data)
        view = AssignStudentToProject.as_view()
        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'message': 'Student assigned to the project successfully.'})
class ArticleTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.article = Article.objects.create(article_name='Test Article', article_description='Test content')

    def test_article_list(self):
        url = reverse('article-list')
        request = self.factory.get(url)
        response = pub.articleList(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)  # Assuming there is one article in the database
        print("GET list of articles OK")

    def test_article_detail(self):
        url = reverse('article-detail', args=[self.article.idAr])
        request = self.factory.get(url)
        response = pub.articleDetail(request, self.article.idAr)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['article_name'], 'Test Article')
        print("GET info of article OK")

    def test_article_create(self):
        url = reverse('article-create')
        data = {'article_name': 'New Article', 'article_description': 'New content'}
        request = self.factory.post(url, data)
        response = priv.articleCreate(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Article.objects.count(), 2)  # Assuming there were no articles before
        print("CREATE article OK")

    def test_article_update(self):
        url = reverse('article-update', args=[self.article.idAr])
        data = {'article_name': 'Updated Article', 'article_description': 'Updated content'}
        request = self.factory.post(url, data)
        response = priv.articleUpdate(request, self.article.idAr)
        self.assertEqual(response.status_code, 200)
        self.article.refresh_from_db()
        self.assertEqual(self.article.article_name, 'Updated Article')
        print("UPDATE article OK")

    def test_article_delete(self):
        url = reverse('article-delete', args=[self.article.idAr])
        request = self.factory.delete(url)
        response = priv.articleDelete(request, self.article.idAr)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Article.objects.count(), 0)
        print("DELETE article OK")

class GalleryTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_gallery_list(self):
        request = self.factory.get('/gallery-list/')
        response = gallList(request)
        self.assertEqual(response.status_code, 200)
        print("GET gallery list OK")

    def test_gallery_detail(self):
        # Create a Gallery object for testing
        gallery = Gallery.objects.create(gallery_name='Test Gallery')
        request = self.factory.get(f'/gallery-detail/{gallery.idGa}/')
        response = gallDetail(request, gallery.idGa)
        self.assertEqual(response.status_code, 200)
        print("GET gallery details OK")

    def test_gallery_create(self):
        data = {'gallery_name': 'Test Gallery'}
        request = self.factory.post('/gallery-create/', data)
        response = gallCreate(request)
        self.assertEqual(response.status_code, 200)
        print("CREATE gallery OK")

    def test_gallery_update(self):
        # Create a Gallery object for testing
        gallery = Gallery.objects.create(gallery_name='Test Gallery')
        data = {'gallery_name': 'Updated Gallery'}
        request = self.factory.post(f'/gallery-update/{gallery.idGa}/', data)
        response = gallUpdate(request, gallery.idGa)
        self.assertEqual(response.status_code, 200)
        print("UPDATE gallery OK")

    def test_gallery_delete(self):
        # Create a Gallery object for testing
        gallery = Gallery.objects.create(gallery_name='Test Gallery')
        request = self.factory.delete(f'/gallery-delete/{gallery.idGa}/')
        response = gallDelete(request, gallery.idGa)
        self.assertEqual(response.status_code, 200)
        print("DELETE gallery OK")  
