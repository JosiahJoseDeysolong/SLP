## Front-end Development
- HTML
- CSS
- JavaScript
- NodeJS 18.x.x 

## Back-end Development
- Python 11.x.x
- Django
- PostgreSQL

## Dependencies
- Install Github: 
https://git-scm.com/downloads
- Install the latest Node.js: 
https://nodejs.org/en
- Install the latest Python: 
https://www.python.org/downloads/
- Install Postgres: 
https://www.postgresql.org/download/

## Installation
1. Install pre-requisites, Python, PostrgreSQL, NodeJS
- A virtual Python environment is highly recommended
- Configure database info and credentials on **backend/settings.py**, either change or match
2. On a terminal instance, install back-end pre-requisites from **requirements.txt**

```
# Check settings.py inside of backend and change towards your db settings

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '(db name here)',
        'USER': '(username of db here)',
        'PASSWORD': '(password here)',
        'HOST':'localhost',
        'PORT': '5432'
    }
}
```

```
# Activate venv if available
cd groupC
pip install -r requirements.txt
cd groupC/backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
3. On a separate terminal instance, install front-end pre-requisites
```
cd groupC/frontend
npm install
npm run build
npm start
```
**NOTE:** Whenever there are changes to the models, remember to make migrations and migrate through **manage.py**.
```
cd groupC/backend
python manage.py makemigrations
python manage.py migrate
```
