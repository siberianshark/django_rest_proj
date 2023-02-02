from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, Project, ToDo


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    # task = ProjectModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'