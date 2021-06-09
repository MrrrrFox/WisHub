from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
# from django.contrib.auth import admin
from django.contrib import admin 
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser

    
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    fieldsets = UserAdmin.fieldsets #+ (
            # (None, {'fields': ('is_active',)}),
    # )
    list_display = ['username', 'id', 'email', 'first_name', 'last_name', 'is_active']


admin.site.register(CustomUser, CustomUserAdmin)
