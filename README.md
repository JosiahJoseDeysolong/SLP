Group C - SLP Data and User Control Management System

/src/pages - dira lang mo mag add og pages(.jsx)
e butang lang dayun and route sa App.jsx og sa urls.py

by default sqlite ang database sa django, e change lang
nato unya into postgresql


Instructions:

do this after pulling the code from github:

    npm install
    npm run build

^^^ this is for the node_modules and build folders na wala
na nake ge include kay dako ra kaayo siya

To run the django server:
    python manage.py runserver

If you want to edit the frontend ONLY:

    npm start

^^^ mas faster kung kani lang if frontend ra ang imo e edit

    npm run build

^^^every after nimo e edit frontend, kay sa build folder nako ge base ang sa django

For Windows
Install first python 3.6.8
make a new folder
open powershell/cmd into that folder
input:  C:\Users\"NAME"\AppData\Local\Programs\Python\Python36\python.exe -m venv . (Find the installation folder of python3.6)
then type this: .\Scripts\activate
git clone https://github.com/2202-XU-CSCC22B/groupC.git
then type: pip install -r groupC\requirements.txt
then cd groupC/reactslp and type npm install
then npm run build (make sure you cd into reactslp)
cd into djangoslp and type python manage.py runserver
