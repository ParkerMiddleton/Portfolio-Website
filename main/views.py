from django.shortcuts import render, get_object_or_404
from . import models 

#index.html
def index(request):
	projects, algorithms, topics = getModelCollections()
	return render(request, "index.html", {
		"Projects": projects,
		"Algorithms": algorithms,
		"Topics": topics})

#about.html
def about(request):
	projects, algorithms, topics = getModelCollections()
	return render(request,"about.html", {
		"Projects": projects,
		"Algorithms": algorithms,
		"Topics": topics})

#project.html
def project(request, project_id):
	active_project = get_object_or_404(models.Project, id=project_id) #Active Project
	projects, algorithms, topics = getModelCollections()

	url_list = parse_URLs(active_project.code_urls)

	print(active_project.title_image.url)

	return render(request, "project.html", {
		"Active_Project": active_project, 
		"Projects": projects, 
		"Algorithms": algorithms, 
		"Topics": topics,
		"url_list": url_list})

#algorithm.html
def algorithm(request, algorithm_id):
	active_algorithm = get_object_or_404(models.Algorithm, id=algorithm_id) #Active Algo
	projects, algorithms, topics = getModelCollections()

	return render(request, "algorithm.html", {
		"Active_Algorithm": active_algorithm, 
		"Projects": projects, 
		"Algorithms": algorithms,
		"Topics": topics})

#topic.html
def topic(request, topic_id):
	active_topic = get_object_or_404(models.Topic, id=topic_id) #Active Algo
	projects, algorithms, topics = getModelCollections()

	return render(request, "topic.html", {
		"Active_Topic": active_topic, 
		"Projects": projects, 
		"Algorithms": algorithms,
		"Topics": topics})

#All objects for the nav bar
def getModelCollections():
	projects = models.Project.objects.all() #All Projects
	algorithms = models.Algorithm.objects.all()#All Algorithms
	topics = models.Topic.objects.all()#All topics
	return projects, algorithms, topics

def parse_URLs(URLstring):
	url_list = URLstring.split(",")
	return url_list	