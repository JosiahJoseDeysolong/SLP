# Group C - SLP Data and User Control Management System

## Front-end Development
- HTML
- CSS
- JavaScript
- NodeJS 18.x.x 

## Back-end Development
- Python 11.x.x
- Django
- PostgreSQL

## Installation
1. Install pre-requisites, Python, PostrgreSQL, NodeJS
- A virtual Python environment is highly recommended
- Configure database info and credentials on **backend/settings.py**, either change or match
2. On a terminal instance, install back-end pre-requisites from **requirements.txt**
```
# Activate venv if available
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
3. On a separate terminal instance, install front-end pre-requisites
```
npm install
npm run build
npm start
```
**NOTE:** Whenever there are changes to the models, remember to make migrations and migrate through **manage.py**.
```
python manage.py makemigrations
python manage.py migrate
```
