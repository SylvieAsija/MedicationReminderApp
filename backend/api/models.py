# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` 
#   * set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django 
#   * to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    age = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=50)
    password_hash = models.CharField(max_length=25)
    phone_number = models.TextField(blank=True, null=True)
    birthday = models.DateField()
    blood_type = models.CharField(max_length=2, blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
        

class MedicationInfo(models.Model):
    medication_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    dosage = models.CharField(max_length=8)
    medication_time = models.JSONField()
    misc_information = models.CharField(max_length=200, blank=True, null=True)
    frequency = models.CharField(max_length=20, blank=True, null=True)
    medication_name = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medication_info'


class MedicationLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    medication = models.ForeignKey(MedicationInfo, models.DO_NOTHING, blank=True, 
                                   null=True)
    date = models.DateField()
    time = models.TimeField()
    time_zone = models.CharField(max_length=5)
    taken = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medication_log'
        unique_together = (('medication', 'user', 'date'),)


class SymptomLog(models.Model):
    symptom_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    date = models.DateField()
    time = models.TimeField()
    time_zone = models.CharField(max_length=5)
    description = models.CharField(max_length=200)
    severity = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'symptom_log'

