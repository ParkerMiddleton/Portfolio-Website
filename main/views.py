from django.shortcuts import render, get_object_or_404
from . import models 

#index.html
def index(request):
	projects = models.Project.objects.all()
	return render(request, "index.html", {"Projects": projects})

#about.html
def about(request):
	return render(request,"about.html")

#project.html
def project(request, project_id):
	active_project = get_object_or_404(models.Project, id=project_id)
	return render(request, "project.html", {"Project": active_project})