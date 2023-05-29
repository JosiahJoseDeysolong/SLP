from django.contrib import admin

# Register your models here.
from .models import (
    SchoolYear, Article, Semester, College,
    Project, Beneficiary, Student, Coordinator, Dean,
    ProjectPicture, Faculty, Partner, SDG, Gallery, Picture
)

admin.site.register(SchoolYear)
admin.site.register(Semester)
admin.site.register(College)
admin.site.register(Project)
admin.site.register(Beneficiary)
admin.site.register(Student)
admin.site.register(Coordinator)
admin.site.register(Dean)
admin.site.register(ProjectPicture)
admin.site.register(Faculty)
admin.site.register(Partner)
admin.site.register(SDG)
admin.site.register(Article)
admin.site.register(Gallery)
admin.site.register(Picture)