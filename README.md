# Band Rehearsal Scheduler

A comprehensive web application for bands to schedule rehearsals, track member availability, manage setlists, and coordinate equipment.

## Features

- **Rehearsal Scheduling**: Create one-time or recurring rehearsal events with location details
- **Availability Tracking**: Members can mark their availability to help find optimal rehearsal times
- **Automated Reminders**: Email and SMS notifications for upcoming rehearsals
- **Attendance Management**: Track who attended each rehearsal
- **Setlist Creation**: Create and assign song setlists to specific rehearsals
- **Equipment Coordination**: Manage who brings what equipment to each rehearsal
- **Mobile Responsive**: Works on all devices

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Material-UI components
- Formik + Yup for form validation
- Socket.io client for real-time updates

### Backend
- Node.js with Express
- JWT authentication
- Prisma ORM
- PostgreSQL database
- Redis for caching
- Socket.io for real-time communication

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- Docker and Docker Compose (for local development)
- PostgreSQL database
- Redis instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/band-rehearsal-scheduler-app.git
cd band-rehearsal-scheduler-app
```

2. Set up environment variables:
   - Create a `.env` file in the server directory based on `.env.example`
   - Create a `.env` file in the client directory based on `.env.example`

3. Using Docker (recommended):
```bash
docker-compose up
```

4. Manual setup:
```bash
# Install server dependencies
cd server
npm install

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev

# In a new terminal, install client dependencies
cd ../client
npm install

# Start the client
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## API Documentation

API documentation is available at `/api/docs` when the server is running.

## Project Structure

```
├── client/                # React frontend
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── store/         # Redux store and slices
│       ├── utils/         # Utility functions
│       └── App.js         # Main App component
├── server/                # Node.js backend
│   ├── middlewares/       # Express middlewares
│   ├── prisma/            # Prisma schema and migrations
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── index.js           # Server entry point
└── docker-compose.yml     # Docker configuration
```

## Security

- JWT-based authentication with proper token expiration
- Password hashing with bcrypt
- Input validation on all API endpoints
- HTTPS enforcement in production
- Role-based access control

## License

This project is licensed under the MIT License.