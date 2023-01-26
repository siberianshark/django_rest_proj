from django.contrib import admin
from authors import models

admin.site.register(models.Author)
admin.site.register(models.Project)
admin.site.register(models.ToDo)

# @admin.register(models.Author)
# class AuthorAdmin(admin.ModelAdmin):
#     pass