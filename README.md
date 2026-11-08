# Helpdesk Ticketing System

A web-based helpdesk ticketing system built to manage support requests between users and administrators. The application provides ticket submission, tracking, and administrative management through a role-based interface.

## Features

### User
- Register and log in to an account.
- Create support tickets.
- View personal ticket history.
- View ticket details.
- Edit ticket title, description, and priority.
- Delete personal tickets.
- Track ticket status.

### Admin
- Access all submitted tickets.
- View ticket details and user information.
- Monitor ticket statistics.
- Filter and search tickets.
- Update ticket status.
- Delete tickets.
- Navigate tickets using pagination.

## Tech Stack

**Backend**
- PHP
- Laravel
- Laravel Sanctum
- MySQL

**Frontend**
- React
- TypeScript
- Vite
- Axios
- CSS

## Project Structure

```text
helpdesk-ticketing-system/
├── backend/       # Laravel REST API
├── frontend/      # React + TypeScript application
├── database/      # SQL database export
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- PHP
- Composer
- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/muhammadakmalbadilah/helpdesk-ticketing-system.git
cd helpdesk-ticketing-system
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database connection in the `.env` file.

Create a MySQL database named `ticket_system`, then import the SQL file located at `database/ticket_system.sql` from the project root.

Run the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at:

`http://127.0.0.1:8000/api`

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

`http://localhost:5173`

## Authentication & Authorization

The application uses Laravel Sanctum for API authentication with Bearer tokens.

Two roles are supported:

- **User:** Can manage their own support tickets.
- **Admin:** Can manage and monitor all support tickets.

Role-based middleware protects administrative endpoints from unauthorized access.

## Database

The database export is available in:

`database/ticket_system.sql`

The database schema includes users, tickets, authentication tokens, and Laravel-related tables.

## License

This project is developed for learning and portfolio purposes.