# Generated by Django 3.1.5 on 2021-05-19 16:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wishub', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserVotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vote_type', models.CharField(max_length=5)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='post_votes', to='wishub.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='user_votes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'post', 'vote_type')},
            },
        ),
    ]
