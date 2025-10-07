from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from . import models 
import json


@require_POST
@csrf_exempt
def set_viewing_mode(request):
	try:
		data = json.loads(request.body)
		mode = data.get('mode', 'Casual')
  
		if mode in ['Recruiter', 'Casual']:
			request.session['view_mode']= mode
			return JsonResponse({'status': 'success', 'mode':mode})

		return JsonResponse({'status': 'error', 'message': 'Invalid mode'}, status= 400)
	except json.JSONDecodeError:
		return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)



#index.html
def index(request):
    
    #Check if the 'view_mode' is aloready set in the session
	view_mode = request.session.get('view_mode', '')
	projects, algorithms, topics = getModelCollections()
	home_page_singleton = get_object_or_404(models.HomeContents)
	carousel_links = [projects.first(), algorithms.first(), topics.first()]

	return render(request, "index.html", {
		"HomeContent": home_page_singleton,
		"Projects": projects,
		"Algorithms": algorithms,
		"Topics": topics,
		"Carousel_Links": carousel_links, 
		"view_mode": view_mode,
  })


#project.html
def project(request, project_id):
	active_project = get_object_or_404(models.Project, id=project_id) #Active Project
	projects, algorithms, topics = getModelCollections()

	url_list = parse_URLs(active_project.code_urls)

	next_project = models.Project.objects.filter(date__gt= active_project.date).order_by('date').first()


	print(active_project.title_image.url)

	return render(request, "project.html", {
		"Active_Project": active_project, 
		"Projects": projects, 
		"Algorithms": algorithms, 
		"Topics": topics,
		"url_list": url_list,
		"next_project":next_project})

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