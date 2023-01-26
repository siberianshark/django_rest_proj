from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()


class Project(models.Model):
    name_of_project = models.CharField(max_length=150)
    description = models.CharField(max_length=250)

    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    deleted = models.BooleanField(default=False, verbose_name='Удалено')

    def __str__(self):
        return f'{self.name_of_project}'

    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()


class ToDo(models.Model):
    task = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name='Задание')
    task_content = models.CharField(max_length=5000)
    status = models.BooleanField(default=False, verbose_name='Выполнено?')

    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    deleted = models.BooleanField(default=False, verbose_name='Удалено')

    def __str__(self):
        return f'{self.name_of_project}'

    class Meta:
        verbose_name = 'задание'
        verbose_name_plural = 'задания'

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()