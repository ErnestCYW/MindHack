# LifeHack2021: MindStatus
# Team #052
# Version 1.0

## Motivation

In modern society, students are under increasing pressure due to rising expectations with little regard being given to their mental wellness. This problem is further exacerbated in a country like Singapore, where academic performance often takes precedence over personal happiness. It has been proven time and time again that ignoring our emotional health can have detrimental consequences, with little warning until it is too late (https://www.straitstimes.com/singapore/courts-crime/river-valley-high-school-student-16-charged-with-murder-of-schoolmate-13).

**Problem 1: Students are shy/afraid to discuss mental health issues openly.**

In many societies, openly discussing personal mental health issues is often considered taboo. Many students are afraid to admit they have a problem out of fear of being shunned or ostracized by their peers and parents. This in turn leads to students bottling up their emotions with no outlet for release.

**Problem 2: Students do not have a proper emotional support structure.**

Students often do not have dedicated emotional support structures. Parents are busy working, Teachers & Consellors have many students to attend to and have no way of singling a problem out, and peers are often busy with their own problems.

**Problem 3: Students' mental state is never fixed and often volatile.**

A student may be feeling happy on one day, and may be very sad the next. It is important to check in on their well-being everyday.


## Aim

In line with the problem statements given by LifeHack 2021 (Education & Social), Mindstatus aims to check in on students' daily mental status, and teach students about mental wellness through an anonymous & public message board. Our app allows for students to vent their frustrations, and also for people (peers or seniors) to address these problems. Users are able to connect with one another through common problems, and learn about how to cope with their issues.

## User Stories

- As a student, I want to be able to share my problems and seek advice
- As a student, I want someone to check-in on me daily
- As a parent/teacher, I want to know what problems plague my child/student and render help where I can

## Features & Overview

A **Web-Based Application** with a daily check-in quiz and an anonymous message board specific to a certain community where users are able to post their messages.

### Daily Check-in

1. A short quiz to be answered by students which checks in on their mental state. Such questions include ("How happy are you today?", "Is there something bothering you?". etc...). This quiz resets daily.
2. After the quiz is completed, an inspirational quote is shown.
3. Admins will have access to this data to show the general well-being of their students and render help accordingly

### Message Board

1. An anonymous message board specific to a school where students in that school can post about their problems and worries anonymously.
2. Admins (Teacher / Parents / etc...) or peers can respond to these messages to provide assistance or a listening ear.


### Extension Features

1. Allow MindStatus's API to be called externally for integration into other platforms (eg. Luminus / ASKnLEARN / etc...).
2. NLP processing to highlight keywords (eg. Suicide / Depression / etc...) and assign post severity.
3. Reminders to complete quiz.
4. Like / Dislike feature on message board posts for sorting of posts

## Tech Stack

<img src="https://user-images.githubusercontent.com/71819961/126826089-db0b194b-5435-4ca0-bf28-bd2b634a9674.png" width="800">

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
