from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MedicationInfo, MedicationLog
from .models import Refills, SymptomLog
from .models import Users


# Register your models here.
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('age', 'phone_number', 'birthday', 
                           'blood_type', 'height', 'weight')}),
    )


admin.site.register(Users, UserAdmin)
admin.site.register(MedicationInfo)
admin.site.register(MedicationLog)
admin.site.register(Refills)
admin.site.register(SymptomLog)

