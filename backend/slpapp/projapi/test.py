import mimetypes
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Project
from .serializers import ProjectSerializer

class ProjectOutputFileViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(idPr=1)

    def test_get_with_existing_file(self):
        self.project.project_output.name = 'test.txt'
        self.project.project_output.save()

        url = reverse('project-output', args=[self.project.idPr])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.get('Content-Disposition'), 'attachment; filename=test.txt')

    def test_get_with_missing_file(self):
        url = reverse('project-output', args=[self.project.idPr])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_with_existing_file(self):
        self.project.project_output.name = 'test.txt'
        self.project.project_output.save()

        url = reverse('project-output', args=[self.project.idPr])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.project.project_output)

    def test_delete_with_missing_file(self):
        url = reverse('project-output', args=[self.project.idPr])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_with_valid_file(self):
        url = reverse('project-output', args=[self.project.idPr])
        file_data = {'file': open('test.txt', 'rb')}
        response = self.client.put(url, file_data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertTrue(self.project.project_output)
        self.assertEqual(self.project.project_output.name, 'test.txt')

    def test_put_with_missing_file(self):
        url = reverse('project-output', args=[self.project.idPr])
        response = self.client.put(url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(self.project.project_output)
        self.assertEqual(response.data, {'error': 'No file provided.'})
