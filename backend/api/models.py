# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    age = models.IntegerField(blank=True, null=True)
    phone_number = models.TextField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    blood_type = models.CharField(max_length=2, blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'users'
        


class MedicationInfo(models.Model):
    medication_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', 
                             on_delete=models.CASCADE,
                             blank=True,
                             null=True)
    dosage = models.CharField(max_length=8)
    medication_time = models.JSONField()
    misc_information = models.CharField(max_length=200, blank=True, null=True)
    frequency = models.CharField(max_length=20, blank=True, null=True)
    medication_name = models.CharField(max_length=30, blank=True, null=True)
    active_medication = models.BooleanField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'medication_info'


class MedicationLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', 
                             on_delete=models.CASCADE,
                             blank=True,
                             null=True)
    medication = models.ForeignKey(MedicationInfo, 
                                   on_delete=models.CASCADE, 
                                   blank=True, 
                                   null=True)
    date = models.DateField()
    time = models.TimeField()
    taken = models.BooleanField(blank=True, null=True)
    colour = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'medication_log'
        unique_together = (('medication', 'user', 'date'),)


class Refills(models.Model):
    refill_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', 
                             on_delete=models.CASCADE,
                             blank=True,
                             null=True)
    medication = models.ForeignKey(MedicationInfo, 
                                   on_delete=models.CASCADE,
                                   blank=True,
                                   null=True)
    active = models.BooleanField(blank=True, null=True)
    refill_date = models.CharField(max_length=10, 
                                   blank=True, 
                                   null=True)
    refill_time = models.TimeField(blank=True, null=True)
    num_meds = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'refills'


class SymptomLog(models.Model):
    symptom_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', 
                             on_delete=models.CASCADE, 
                             blank=True, 
                             null=True)
    date = models.DateField()
    time = models.TimeField()
    description = models.CharField(max_length=200)
    severity = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'symptom_log'


