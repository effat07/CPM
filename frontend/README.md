Customer Product Management System

A full-stack web application that provides role-based access for managing customers and products. Admins and managers can log in to access the dashboard, perform CRUD operations, and change the site theme. Users can also sign up and reset passwords via email.

Features

Credentials:

admin@gmail.com(password- admin123)– Admin

user@gmail.com(user123)– User

manager@gmail.com()-Manager


Authentication:

Login / Signup

Forgot password via email (check spam folder)


Landing Page: Static page after login/signup

Admin Panel (for Admin/Manager):

Manage Customers (Add, Edit, Delete)

Manage Products (Add, Edit, Delete)

Toggle between Light and Dark Mode


Frontend: Built with Bootstrap for responsive UI



Tech Stack

Frontend: React (or specify if it’s plain HTML/CSS/JS) + Bootstrap

Backend: Node.js + Express

Database: MongoDB / Firebase / SQL (mention yours)

Authentication: Email-based login/reset

UI Theme Toggle: Light/Dark mode





Getting Started

Follow these steps to run the project locally:

1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Dependencies

For both frontend and backend:

npm install or npm i

3. Create a .env File

In the root directory, create a .env file and add the following:

PORT=5000
MONGO_URI=mongodb+srv://mujawareffat26:mujawareffat26@cpm.jejgrya.mongodb.net/?retryWrites=true&w=majority&appName=CPM
JWT_SECRET=superSecretKey
EMAIL_USER=mujawareffat26@gmail.com
EMAIL_PASS=lriq mhte dqor cobv




4. Install Bootstrap (Frontend)

npm install bootstrap

Import it in your main index.js or App.js file:

import 'bootstrap/dist/css/bootstrap.min.css';

5. Run the Backend

npm start

6. Run the Frontend

Navigate to frontend folder if it's in a separate directory:

cd frontend
npm install
npm start










