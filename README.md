# Employee Attendance Web Application

## Introduction

This web application is designed to facilitate the management of employee attendance for a small organization. The system includes features for employees to check in and check out, with specific business rules and validations to ensure accurate attendance tracking. Additionally, administrators can manage employee records and view attendance details.

## Entities

### Employee

- Represents an individual within the organization.
- Each employee has a unique identifier, a name, and other relevant details.

### Attendance

- Records the check-in and check-out events for each employee.
- Includes timestamps and justification for attendance flags.

## Business Rules

- Work hours are from 7:00 am to 4:00 pm, with a lunch break from 12:00 pm to 1:00 pm.
- Employees are allowed to check in until 8:00 am and check out until 3:00 pm.
- Each employee is expected to have one check-in and one check-out event per day.
- Double check-in or checkout operations are prevented (Optional feature).
- Late check-ins after 8:30 am and early check-outs before 3:00 pm are flagged.
- Flags are justified with reasons (Optional feature).
- Employees are required to cover 40 hours per week.
- Email notifications are sent for attendance-related events (simulated, not integrated with an email gateway).

## Required Screens and Actions

### Admin

- **List of Employees**: View a list of all employees.
- **Manage Employee**: Add, update, or delete employee records.

### Employee

- **View My Attendance**: Access a history of attendance events.
- **Attendance Check-in**: Log the start of the workday.
- **Attendance Check-out**: Log the end of the workday.
- **Write Justification for Attendance Flag**: Provide reasons for flagged attendance events (Optional feature).

## Extra Screens and Actions

### Back-end

- **Authentication**: Secure user authentication.
- **Logging**: Capture relevant system events for auditing and debugging.

### Front-end

- **Login Page**: Authenticate users before accessing the application.
- **Authorization**: Control access to different features based on user roles.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/EngYazeedAli/royal_frontend_NextJS.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the backend authentication and logging as needed.

4. Start the application:

   ```bash
   npm start
   ```

Visit `http://localhost:3000` in your browser to use the application.

## Technologies Used

- [React](https://reactjs.org/) for the front-end.
- [Next.js](https://nextjs.org/) for server-side rendering.
- [Node.js](https://nodejs.org/) for the back-end.
