# Backend Website Project

This guide helps you set up the backend for 
a website project using Python and Django.

### Steps to Create a Backend Project:

#### 1. Set up a Python Virtual Environment
To create a Python virtual environment:
```aiignore
# Check if Python is installed on your system
py --version

# Create a virtual environment
py -m venv .venv

# Activate the virtual environment (Windows)
.venv\Scripts\activate.bat

# Deactivate when you're done
deactivate
```
#### 2. Install Django and Verify Installation
Install Django and confirm it's working properly:
```aiignore
# Activate the virtual environment
.venv\Scripts\activate.bat

# Install Django and update pip
py -m pip install Django
py -m pip install -U pip

# Verify the installation of Django
py
import django
print(django.get_version())
quit()

# Deactivate the virtual environment when done
deactivate
```
#### 3. Start a New Django Project
Create and test a new Django project:
```aiignore
# Activate the virtual environment
.venv\Scripts\activate.bat

# Start a new Django project
django-admin startproject online_shop

# Navigate into the project directory
cd online_shop

# Run the development server
py manage.py runserver  # Press CTRL + C to stop the server

# Deactivate the virtual environment when done
deactivate
```
#### 4. Change Database from SQLite to PostgreSQL
To switch from SQLite to PostgreSQL, follow these steps:
```aiignore
# Activate the virtual environment
.venv\Scripts\activate.bat

# Install PostgreSQL dependencies
pip install psycopg2-binary

# Update settings.py to use PostgreSQL
# Modify DATABASES setting to:
# 'ENGINE': 'django.db.backends.postgresql',
# 'NAME': 'your_database_name',
# 'USER': 'your_database_user',
# 'PASSWORD': 'your_database_password',
# 'HOST': 'localhost',
# 'PORT': '5432'

# Install django-environ (optional for environment variables)
pip install django-environ

# Run the development server
python manage.py runserver

# Deactivate the virtual environment when done
deactivate
```