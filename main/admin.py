from django.contrib import admin
from .models import Project, Topic, Algorithm

# Register your models here.
admin.site.register(Project)
admin.site.register(Topic)
admin.site.register(Algorithm)