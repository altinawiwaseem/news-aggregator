## News Aggregator Documentation

### Introduction

The News Aggregator project is a web application that aggregates news articles from three API sources: NewsAPI, The Guardian, and The New York Times. The application allows users to search for news articles using various methods such as keywords, categories, dates, languages, and countries. Additionally, users can save their search preferences in a preferences dashboard and view the news articles based on their saved preferences.

The project is built using Laravel for the backend and React for the frontend. It is dockerized and can be set up and run using Docker Compose. To get started, follow the instructions below.

![Demo](./client/public/images/messageboard.gif)

---

### Prerequisites

Before proceeding with the installation, make sure you have the following prerequisites installed on your system:

- Docker (with Docker Compose)

### Project Setup

- Clone the repository:
  git clone <git@github.com:altinawiwaseem/news-aggregator.git>
- cd news-aggregator
- cd frontend
- cp .env.example .env
- cd ..
- cd backend
- cp .env.example .env
- ./vendor/bin/sail up

### Accessing The Application

Frontend: http://localhost:3000
Backend API: http://localhost
database : http://localhost:8080

### Usage

Homepage
Once the installation is complete and the containers are running, open your web browser and go to http://localhost:3000 to access the News Aggregator application.

- Click the "Sign up" link to create a new account, or click the "Log in" link to log in to an existing account. after successfully Sign up or Logged in you will be redirected to the news page.

- Search
  The news page provides a search bar where users can enter keywords, categories, dates, languages, or countries to search for news articles. Click the "Search" button to initiate the search.

- Preferences Dashboard
  To save search preferences and view news articles based on the saved preferences.

In the Preferences Dashboard, you can set your preferred keywords, categories, languages, and countries for news articles. you can also there add and delete your search preferences.
Click the "Save Preferences" button to save your preferences.

News Page
After setting your preferences, navigate to the My News to view news articles based on your saved preferences. The news articles will be displayed according to the keywords, categories, dates, languages, and countries you have specified.

##### Developed With

- [x] _HTML5_
- [x] _Tailwind CSS_
- [x] _JavaScript_
- [x] _React_
- [x] _npm_
- [x] _node js_
- [x] _laravel_
- [x] _php_
- [x] _mysql_
- [x] _docker_

---

### Contact

Mail: <wasemm@live.com> <br>
GitHub:[altinawiwaseem](https://github.com/altinawiwaseem)

---

### Used Tools

- [icons](https://flaticons.com)
- [Canva](https://www.canva.com/)
- [npm](https://www.npmjs.com/)
- [Google Fonts](https://fonts.google.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [NewsApi](https://newsapi.org/)
- [The Guardian Api](https://open-platform.theguardian.com/)
- [New York Times Api](https://developer.nytimes.com/)

---
