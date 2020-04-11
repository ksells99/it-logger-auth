## IT Ticket Logger

MERN stack application built with React and Redux, allowing for IT departments etc. to log support tickets and assign them to technicians.

The core of the application was built via Traversy Media's "React Front to Back" course on Udemy, however I have drastically expanded the functionality and changed the user interface after building on my React/Redux skills.

I have connected the application to a MongoDB database (the intial project was simply just a JSON web server), and have implemented full user authentication to allow users to register for accounts and store their own set of tickets and technicians - this is handled via JSON webtokens saved in local storage, and protected routes ensure only those logged in can access/add tickets and technicians. I have also expanded the technician functionality, allowing users to edit technician details (the core application built in the course only allowed you to delete technicians).

Tickets can be set as requiring attention or not, which in turn changes certain styling elements.

The styling/CSS isn't perfect and the app is best viewed on desktop rather than mobile, but this was more of a MERN stack project rather than a CSS showcase!

The application is hosted on Heroku and can be accessed here: **https://ksells-it-ticket-logger-auth.herokuapp.com/**
