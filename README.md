# Band Rehearsal Scheduler

A comprehensive web application designed to streamline the organization of band rehearsals. It helps bands automatically schedule rehearsals, send reminders, track attendance, and suggest optimal rehearsal times based on member availability.

## 🎵 Features

### Core Features
- **Rehearsal Creation and Management**
  - Create, edit, and delete rehearsal events
  - Set location, duration, and purpose for each rehearsal
  - Recurring rehearsal options (weekly, bi-weekly, monthly)
  
- **Member Availability Tracking**
  - Calendar-based availability submission
  - Conflict visualization
  - Bulk availability entry
  
- **Optimal Time Suggestion**
  - Algorithm to find best rehearsal times based on member availability
  - Priority weighting for essential members
  
- **Attendance Tracking**
  - RSVP functionality
  - Attendance history and reporting
  - Absence notifications
  
- **Automated Notifications**
  - Email/SMS reminders for upcoming rehearsals
  - Notification preferences
  - Custom message templates
  
- **Setlist Management**
  - Create and assign setlists to rehearsals
  - Track song practice frequency
  - Prioritize songs based on upcoming performances
  
- **Equipment Checklist**
  - Assign equipment responsibilities
  - Track equipment availability

- **Mobile Responsive Interface**
  - Fully functional on all devices

## 🚀 Technology Stack

### Frontend
- React.js
- Redux for state management
- Material-UI component library
- Formik + Yup for form handling
- date-fns for date/time operations
- react-big-calendar for calendar views
- Axios for API communication

### Backend
- Node.js with Express
- JWT authentication with Passport.js
- Prisma ORM
- Socket.io for real-time updates
- node-cron for scheduled tasks
- Nodemailer with SendGrid for email
- Twilio for SMS notifications

### Database
- PostgreSQL
- Redis for caching

### DevOps & Deployment
- Docker
- GitHub Actions for CI/CD
- Vercel (Frontend)
- Heroku (Backend)
- Sentry for error monitoring

## 📋 Project Structure

```
band-rehearsal-scheduler/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── assets/         # Images, fonts, etc.
│       ├── components/     # Reusable components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── store/          # Redux store
│       └── utils/          # Utility functions
│
├── server/                 # Backend Node.js/Express application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Database models
│   ├── prisma/             # Prisma schema and migrations
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   └── utils/              # Utility functions
│
├── docker/                 # Docker configuration
├── .github/                # GitHub Actions workflows
└── docs/                   # Documentation
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Redis (optional for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-app.git
   cd band-rehearsal-scheduler-app
   ```

2. **Set up environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

3. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

4. **Database setup**
   ```bash
   # In the server directory
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development servers**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In another terminal, start the frontend server
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Deployment

#### Using Docker
```bash
docker-compose up -d
```

#### Manual Deployment
- Backend: Deploy to Heroku using the provided Procfile
- Frontend: Deploy to Vercel using the Vercel CLI or GitHub integration

## 📄 API Documentation

API documentation is available at `/api/docs` when running the server.

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/dxaginfo/band-rehearsal-scheduler-app](https://github.com/dxaginfo/band-rehearsal-scheduler-app)