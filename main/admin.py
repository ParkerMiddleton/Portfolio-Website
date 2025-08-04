from django.contrib import admin
from .models import Project, Topic, Algorithm, DesignConcept, HomeContents

# Register your models here.
admin.site.register(Project)
admin.site.register(Topic)
admin.site.register(Algorithm)
admin.site.register(DesignConcept)
admin.site.register(HomeContents)