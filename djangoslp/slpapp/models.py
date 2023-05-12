from django.db import models

# Create your models here.

class Projects(models.Model):
    projectId = models.AutoField(primary_key=True)
    projectName = models.CharField(max_length=500)
    status_select = (('ongoing','Ongoing'),('complete','Complete'))
    status = models.CharField(choices=status_select, max_length=500)
    sl_select = (('direct', 'Direct'),('indirect', 'Indirect'),('research', 'Research'),('advocacy', 'Advocacy'))
    slType = models.CharField(choices=sl_select, max_length=15)

class Gallery(models.Model):
    pcitureId = models.AutoField(primary_key=True)
    pictures = models.FileField(upload_to="uploads/gallery/")
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

class Beneficiaries(models.Model):
    benificariId = models.AutoField(primary_key=True)
    b_name = models.CharField(max_length=500)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

class Students(models.Model):
    studentId = models.AutoField(primary_key=True)
    studentName = models.CharField(max_length=500)
    preSL = models.URLField(max_length=200)
    postSL = models.URLField(max_length=200)
    cmo = models.FileField(upload_to="uploads/students_cmo/")
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

class Faculty(models.Model):
    facultyId = models.AutoField(primary_key=True)
    facultyName = models.CharField(max_length=500)
    facultyPic = models.FileField(upload_to="uploads/faculty_pics/")
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

class Partner(models.Model):
    partnerId = models.AutoField(primary_key=True)
    partnerName = models.CharField(max_length=500)
    mou = models.FileField(upload_to="uploads/partner_mous/")
    partnerDesc = models.TextField()
    parnerLoc = models.CharField(max_length=500)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

class Reports(models.Model):
    reportId = models.AutoField(primary_key=True)
    reportType = models.CharField(max_length=500)
    reportFile = models.FileField(upload_to="uploads/reports/")

class Articles(models.Model):
    articleId = models.AutoField(primary_key=True)
    articleTitle = models.CharField(max_length=500)
    desc = models.TextField()