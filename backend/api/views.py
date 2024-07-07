# views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os

from .models import MedicationInfo


# Create your views here.
def test_page(request):
    return HttpResponse('This is a test page to verify if the \
                        django setup works')


# def api_home(request):
#     return render(request, os.path.join(settings.FRONTEND_DIR, 'lib',
#                   'main.dart'))

def api_home(request):
    
    #THIS IS A SAMPLE USER, MUST BE EDITED
    user_id = 1 
    if request.method == 'GET':
        meds = MedicationInfo.objects.filter(user_id=user_id)
        data = list(meds.values())
        return JsonResponse(data, safe=False)