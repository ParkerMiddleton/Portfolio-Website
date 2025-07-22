from django.db import models

#A general template for each Project
class Project(models.Model):
	title = models.CharField(max_length=100, blank=False) #Title 
	project_description = models.TextField(blank=False) #Description in HTML
	technologies = models.TextField(blank=False) #what was used to create the 
	date = models.DateField(blank=False) #Date the project was completed.
	course = models.CharField(max_length=100, blank=False) #The course associated with the project
	course_description = models.TextField(blank = False) # Description of the course associated with the project
	title_image = models.ImageField(upload_to="project_images/",blank=True, null=True) #image behind the title
	#Code for projects??
	code_urls = models.TextField(blank=True, null=True) #URLs that link to the gitfiles to be displayed.
	demo_video = models.FileField(null=True,blank=True) #demo video 
	code_video = models.FileField(null=True,blank=True) #code video

	def __str__(self):
		return self.title

#A General template for each algortihm upload
class Algorithm(models.Model):
	title = models.CharField(max_length=100, blank=False) #Algorithm Title
	description = models.TextField(blank=False) #Description of the algorithm and why I like it
	leetcode_video = models.FileField(null=True, blank=True) #a video demo of me using the algorithm

class Topic(models.Model):
	title = models.CharField(max_length=100, blank=False) #topic title
	description = models.TextField(blank = False) #topic description
