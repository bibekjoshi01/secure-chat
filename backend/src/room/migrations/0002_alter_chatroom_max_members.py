# Generated by Django 3.2 on 2023-11-27 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroom',
            name='max_members',
            field=models.PositiveIntegerField(blank=True, default=16, null=True),
        ),
    ]
