from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name_of_project = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['name_of_project']


class ToDoFilter(filters.FilterSet):
    task = filters.CharFilter(lookup_expr='icontains')
    created_at = filters.DateFilter(lookup_expr='icontains')

    class Meta:
        model = ToDo
        fields = ['task', 'created_at']