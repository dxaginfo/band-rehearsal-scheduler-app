require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');

// Import middleware
const { authenticateJWT } = require('./middlewares/auth');

// Import route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bandRoutes = require('./routes/bands');
const rehearsalRoutes = require('./routes/rehearsals');
const setlistRoutes = require('./routes/setlists');
const songRoutes = require('./routes/songs');
const equipmentRoutes = require('./routes/equipment');

// Import scheduled tasks
const { sendRehearsalReminders } = require('./services/reminderService');

// Create Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Band Rehearsal Scheduler API',
      version: '1.0.0',
      description: 'API for the Band Rehearsal Scheduler application',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateJWT, userRoutes);
app.use('/api/bands', authenticateJWT, bandRoutes);
app.use('/api/rehearsals', authenticateJWT, rehearsalRoutes);
app.use('/api/setlists', authenticateJWT, setlistRoutes);
app.use('/api/songs', authenticateJWT, songRoutes);
app.use('/api/equipment', authenticateJWT, equipmentRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Socket.io events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_band', (bandId) => {
    socket.join(`band:${bandId}`);
    console.log(`User joined band room: band:${bandId}`);
  });

  socket.on('leave_band', (bandId) => {
    socket.leave(`band:${bandId}`);
    console.log(`User left band room: band:${bandId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Schedule tasks
// Run every day at 9am
cron.schedule('0 9 * * *', () => {
  console.log('Running scheduled task: sending rehearsal reminders');
  sendRehearsalReminders();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, httpServer };