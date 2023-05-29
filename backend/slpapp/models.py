from django.db import models
from django.db.models import UniqueConstraint


class Gallery(models.Model):
    gallery_name = models.CharField(max_length=200, unique=True)
    idGa = models.AutoField(primary_key=True)

    def __str__(self):
        return self.gallery_name
    

class Picture(models.Model):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/gallery/', null=True, blank=True)
    idPi = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.gallery.gallery_name} - Picture {self.idPi}"



class SchoolYear(models.Model):
    year_name = models.CharField(max_length=200, unique=True)
    annual_slp_plan = models.FileField(upload_to="uploads/schoolyear/plan/", null=True, blank=True)
    idSy = models.AutoField(primary_key=True)

    def __str__(self):
        return self.year_name
    
class Article(models.Model):
    school_year_ar = models.ForeignKey(SchoolYear, on_delete=models.CASCADE, null = True, blank =True)
    article_picture = models.ImageField(upload_to="uploads/schoolyear/articles/", null = True, blank = True)
    article_name = models.CharField(max_length=200, unique=True)
    article_description =  models.TextField(null=True, blank = True)

    idAr = models.AutoField(primary_key=True)

    def __str__(self):
        return self.article_name
    
class Semester(models.Model):

    SEMESTER_TYPE = (
        ('First Semester','First Semester'),
        ('Second Semester','Second Semester'),
        ('Intersession', 'Intersession' ),
    )

    school_year = models.ForeignKey(SchoolYear, on_delete=models.CASCADE, null = True, blank =True)
    semester_name = models.CharField(max_length=50, choices=SEMESTER_TYPE)
    accomplishment_rate = models.FloatField(default=0.0, null=True, blank=True)
    idSe = models.AutoField(primary_key=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['school_year', 'semester_name'],
                name='unique_school_year_semester_name'
            )
        ]

    def __str__(self):
        return f'({self.school_year})({self.semester_name}) '
    

class Coordinator(models.Model):
    coor_first_name = models.CharField(max_length=500)
    coor_last_name = models.CharField(max_length=500)
    coor_middle_name = models.CharField(max_length=500)
    idCoor = models.AutoField(primary_key=True)
    

class Dean(models.Model):
    dean_first_name = models.CharField(max_length=500)
    dean_last_name = models.CharField(max_length=500)
    dean_middle_name = models.CharField(max_length=500)
    idDe = models.AutoField(primary_key=True)


class College(models.Model):
    COLLEGE_TYPE = (
        ('College of Agriculture','College of Agriculture'),
        ('College of Arts and Sciences','College of Arts and Sciences'),
        ('College of Computer Studies', 'College of Computer Studies' ),
        ('College of Engineering', 'College of Engineering'),
        ('College of Nursing','College of Nursing'),
        ('School of Business and Management', 'School of Business and Management' ),
        ('School of Education', 'School of Education' ),
        ('Professional Schools', 'Professional Schools' ),
    )
    school_year = models.ForeignKey(SchoolYear, on_delete=models.CASCADE, null = True, blank =True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, null = True, blank =True)
    coordinator = models.ForeignKey(Coordinator, on_delete=models.SET_NULL, null=True, blank=True)
    dean = models.ForeignKey(Dean, on_delete=models.SET_NULL, null = True, blank =True)
    college_name = models.CharField(max_length=50, choices=COLLEGE_TYPE)

    idCol = models.AutoField(primary_key=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['semester', 'college_name'],
                name='unique_semester_college'
            )
        ]
    
     
    
    
# many to one with project
class Student(models.Model):
    student_first_name = models.CharField(max_length=500)
    student_last_name = models.CharField(max_length=500)
    student_middle_name = models.CharField(max_length=500)

    pre_sl = models.URLField(max_length=500, null=True, blank=True)
    post_sl = models.URLField(max_length=500, null=True, blank=True)
    cmo = models.FileField(upload_to="uploads/students_cmo/", null=True, blank=True)

    idSt = models.AutoField(primary_key=True)



# many to one with project
class Beneficiary(models.Model):
    benificary_name = models.CharField(max_length=500, unique=True)
    benificary_description = models.TextField(null=True, blank = True)
    idBe = models.AutoField(primary_key=True)

    def __str__(self):
        return self.benificary_name

class SDG(models.Model):
    SDG_TYPE = (
        ('No Poverty', 'No Poverty'),
        ('Zero Hunger', 'Zero Hunger'),
        ('Good Health and Well Being', 'Good Health and Well Being'),
        ('Quality Education', 'Quality Education'),
        ('Gender Equaility', 'Gender Equaility'),
        ('Clean Water and Sanitation', 'Clean Water and Sanitation'),
        ('Affordable and Clean Energy', 'Affordable and Clean Energy'),
        ('Decent Work and Economic Growth','Decent Work and Economic Growth'),
        ('Industry, Innovation, and Infrastructure','Industry, Innovation, and Infrastructure'),
        ('Reduced Inequalities','Reduced Inequalities'),
        ('Sustainable Cites and Communities','Sustainable Cites and Communities'),
        ('Responsible Consumption and Production','Responsible Consumption and Production'),
        ('Climate Action','Climate Action'),
        ('Life Below Water','Life Below Water'),
        ('Life on Land','Life on Land'),
        ('Peace, Justice and Strong Institutions','Peace, Justice and Strong Institutions'),
        ('Partnerships for the Goals','Partnerships for the Goals'),
      
    )

    sdg_name = models.CharField(max_length=500, choices=SDG_TYPE)
    sdg_pic = models.ImageField(upload_to="uploads/sdg_pictures/", null = True, blank = True) 
    idSd = models.AutoField(primary_key=True)

    def __str__(self):
        return self.sdg_name

# one to one with project
class Partner(models.Model):
    partner_name = models.CharField(max_length=500, unique=True)
    partner_location = models.CharField(max_length=500, null = True, blank = True)
    partner_description =  models.TextField(null=True, blank = True)
    mou_sla = models.FileField(upload_to="uploads/partner_cmo/", null=True, blank=True)

    idPa = models.AutoField(primary_key=True)


    def __str__(self):
        return self.partner_name
    
# many to one with project
class Faculty(models.Model):
    faculty_first_name = models.CharField(max_length=500)
    faculty_last_name = models.CharField(max_length=500)
    faculty_middle_name = models.CharField(max_length=500)
    idFa = models.AutoField(primary_key=True)


    def __str__(self):
        return self.faculty_first_name

# many to one with project
class ProjectPicture(models.Model):
    project_picture = models.ImageField(upload_to="uploads/project/pictures/", null = True, blank = True)
    idPP = models.AutoField(primary_key=True)

    def __str__(self):
        return str(self.idPP)
    
class Project(models.Model):
    school_year = models.ForeignKey(SchoolYear, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    project_detail_picture = models.ImageField(upload_to="project/", null = True, blank = True)
    project_name = models.CharField(max_length=500)
    project_description =  models.TextField(null=True, blank = True)
    status = models.CharField(max_length=500, null=True, blank=True)
    sl = models.CharField(max_length=500, null=True, blank=True)
    subject_hosted = models.CharField(max_length=500, null=True, blank=True)
    pictures = models.ManyToManyField(ProjectPicture, blank=True)
    academic_program = models.CharField(max_length=500, blank=True)
    beneficiary = models.ManyToManyField(Beneficiary, blank=True)
    student = models.ManyToManyField(Student, blank=True)
    faculty = models.ManyToManyField(Faculty, blank=True)
    sdg= models.ManyToManyField(SDG, blank =True)
    partner = models.ForeignKey(Partner, on_delete=models.SET_NULL, null = True, blank =True)
    project_output = models.FileField(upload_to="uploads/projects/outputs/", null=True, blank=True)
    cmo63 = models.FileField(upload_to="uploads/projects/cmo/", null=True, blank=True)
    idPr = models.AutoField(primary_key=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['college', 'project_name'],
                name='unique_college_project_name'
            )
        ]
    