Patient Management System

The Patient Management System is a web-based application designed to manage patient records, medical histories, and appointments efficiently. The system provides access controls for patients, doctors, and administrators.

-   Features
        Patients
            View and update personal details.
            View their medical history.
            Book appointments with doctors.
        Doctors
            View assigned patients' details and medical history.
            Update patient treatment records.
        Admins
            Manage all patient records, doctor profiles, and appointments.

-   Installation

- Prerequisites
    Node.js >= v14
    MongoDB >= v4.2
    npm or yarn

- Steps - 
    1 Clone the repository:
        git clone <REPOSITORY_URL>
        cd <PROJECT_DIRECTORY>
    2 Install dependencies:
        npm install
    3 Configure environment variables:
    4 Start the application:
        npm start


- Technologies Used
    Backend: Node.js, Express.js
    Database: MongoDB with Mongoose
    Validation: Joi
    Authentication: JWT

    Note -
    An admin account will be created by default by invoking the creation function when the server starts.