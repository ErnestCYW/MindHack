# LifeHack2021: MindHack
# Team #052: Team findNewBF@CAPT16-61
# Version 1.0

## Motivation

In modern society, students are under increasing pressure due to rising expectations with little regard being given to their mental wellness. This problem is further exacerbated in a country like Singapore, where academic performance often takes precedence over personal happiness. It has been proven time and time again that ignoring our emotional and mental health can have detrimental consequences. More often than not, there is little warning and things become to late for other to intervene. One recent example would the River Valley High School incident, where mental health could have been a factor leading up to the unfortunate events that took place. (https://www.straitstimes.com/singapore/courts-crime/river-valley-high-school-student-16-charged-with-murder-of-schoolmate-13).

**Problem 1: Students are shy/afraid to discuss mental health issues openly.**

In many societies, openly discussing personal mental health issues is often considered taboo. Many students are afraid to admit they have a problem out of fear of being shunned or ostracized by their peers and parents. This in turn leads to students bottling up their emotions with no outlet for release.

**Problem 2: Students do not have a proper emotional support structure.**

Students often do not have dedicated emotional support structures. In line with the previous point, with a lack of mental health awareness in societies, there would be less strucutres in place to tackle the issue. Parents are busy working, Teachers & Consellors have many students to attend to and have no way of singling a problem out, and peers are often busy with their own problems. 

**Problem 3: Students' mental state is never fixed and often volatile.**

A student may be feeling happy on one day, and may be very sad the next. Some declines in mental health may be unexpected, or not outwardly visible to others. It is important to check in on their well-being everyday.


## Aim

In line with the problem statements given by LifeHack 2021 (Education & Social), MindHack is targeted for schools, and aims to check in on students' daily mental status. The pandemic has shown us that daily temperature declaration is necessary. Why not a regular check-in system for mental health? MindHack will allow students to check-in and update how they are doing by answering short questions which serve as basic mental-health indicators. Moreover, it will be an avenue to allow anonymous and public message boards about mental-health questions, current frustrations, and queries regarding well-being. Students will be able to connect and see common problems, while teachers and counsellors will be able to analyse simple data, view 'at-risk' students, and monitor the general trend of each student's wellbeing. 


## User Stories

- As a student, I want to be able to share my problems and seek advice without fear of being judged.
- As a student, I want someone to check-in on me daily
- As a teacher, I want to know when to reach out to my students 
- As a teacher, I want to be more available to my students 
- As a parent/teacher, I want to know what problems plague my child/student and render help where I can

## Features & Overview

A **Web-Based Application** with a daily check-in form and an anonymous message board specific to a certain community where users are able to post their messages. Admins will be able to view this data through an authorized account. 

### Daily Check-in

1. A short quiz to be answered by students which checks in on their mental state. Such questions include ("How happy are you today?", "Is there something bothering you?", etc...). 
2. After the quiz is completed, an inspirational quote is shown.

### Message Board

1. An anonymous message board specific to a school where students in that school can post about their problems and worries anonymously.
2. Admins (Teacher / Parents / etc...) or peers can respond to these messages to provide assistance or a listening ear.

### Admin overview
1. Access to well-being check-in data of students.
2. Daily, weekly, monthly charts of all students, and individual students.
3. Data on individual questions.
4. 'At-risk' students with low scores
5. Easy visual representation of data

### Extension Features

1. Allow MindStatus's API to be called externally for integration into other platforms (eg. Luminus / ASKnLEARN / etc...).
2. NLP processing to highlight keywords (eg. Suicide / Depression / etc...) and assign post severity.
3. Reminders to complete quiz.
4. Upvote / downvote feature on message board posts for sorting of posts.
5. Students could be linked up with a therapist/counsellor instantaneosuly in a chat room to receive assistance.
6. Students can chat with other students omegle style.
7. Open response questions (eg. Anything to get off your chest? / Share with me something that has been bothering you? / ....)

## Screenshots

### Students

Login
![Screenshot 2021-07-24 at 11 15 55 AM](https://user-images.githubusercontent.com/71819961/126855925-259614e8-386e-4e8b-8294-9340eb731dc5.png)

Register
![Screenshot 2021-07-24 at 11 15 45 AM](https://user-images.githubusercontent.com/71819961/126855926-9a7e9861-6862-4849-85d1-325074d9f276.png)

Dashboard
![photo_2021-07-24 11 13 03](https://user-images.githubusercontent.com/71819961/126855935-01607350-c5aa-4001-828b-500d26b795dd.jpeg)

### Admins

Login
![photo_2021-07-24 11 12 58](https://user-images.githubusercontent.com/71819961/126855939-3b346f9f-bae7-48f0-9525-7c6a8bf95cf3.jpeg)

Register
![photo_2021-07-24 11 13 00](https://user-images.githubusercontent.com/71819961/126855946-5096c879-54ee-426f-8134-e63816a5d4cc.jpeg)

Dashboard
![photo_2021-07-24 11 13 59](https://user-images.githubusercontent.com/71819961/126855949-11d612a7-42b4-4d5e-a6e3-bd1baff523c0.jpeg)

Student Message Board
![photo_2021-07-24 11 13 56](https://user-images.githubusercontent.com/71819961/126855954-8f4a8fcc-d0bf-49f4-b633-ed9ba0909b4e.jpeg)

## Running Application Locally

### Clone the repo and follow instructions below

### Database:
1) Install postgresSQL on your local machine and start local server. 
2) Start up psql command line
3) Database port should be "5432", user should be "postgres", password should be "password123". See server/db.js for custom configuration.
4) Copy and paste the first line in server/database.sql file into psql command line to create database (CREATE DATABASE lifehack;)
5) Enter the following "\c lifehack" to change into database
6) Copy and paste all lines in server/database.sql into psql command line
7) You may choose to populate the database with dummy data by copying as pasting all lines in databaseMock.sql

### Server:
1) cd server
2) npm install (installs dependencies based on package.json)
3) nodemon index.js (can use included script "npm run dev" as well)
4) server will run on localhost:5000

### Frontend (client):
1) cd client  
2) npm install (installs dependencies based on package.json)
3) npm start
4) client will run on localhost:3000

### Frontend (client-admin):
1) cd client-admin
2) npm install (installs dependencies based on package.json)
3) npm start
4) client will run on localhost:4000


DO CONTACT US IF YOU ARE HAVING ANY TROUBLES RUNNNING THIS CODE, WE ARE HAPPY TO HELP!

## Tech Stack

<img src="https://user-images.githubusercontent.com/71819961/126826089-db0b194b-5435-4ca0-bf28-bd2b634a9674.png" width="800">

<img src="https://user-images.githubusercontent.com/71819961/126855818-80977785-99e4-43d7-8a7f-06393dfb4330.png" width="800">

1. HTML / CSS / Javascript 
2. ExpressJS / NodeJS
3. PostgreSQL 
4. JSON Web Token 
5. ReactJS 

NOTE: Use of PERN stack allows for scalability in the future: disjointed backend suitable for API calls.

## Team Members

- Sherman Ng
- Lim Ji Wei
- Timothy Wong
- Ernest Chan
