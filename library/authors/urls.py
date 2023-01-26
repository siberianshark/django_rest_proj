from authors import views
from django.urls import path
from authors.apps import AuthorsConfig
from django.views.decorators.cache import cache_page
app_name = AuthorsConfig.name

urlpatterns = [
    path('projectlist/', views.ProjectListAPIView.as_view(), name="contacts"),
]