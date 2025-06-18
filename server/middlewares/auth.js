const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware to authenticate JWT tokens
 */
const authenticateJWT = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          message: 'No token provided',
          status: 401,
        },
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        error: {
          message: 'Invalid token',
          status: 401,
        },
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'User not found',
          status: 401,
        },
      });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      error: {
        message: 'Server error during authentication',
        status: 500,
      },
    });
  }
};

/**
 * Middleware to check if user is band leader
 */
const isBandLeader = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    const userId = req.user.userId;

    const membership = await prisma.bandMember.findUnique({
      where: {
        bandId_userId: {
          bandId,
          userId,
        },
      },
    });

    if (!membership) {
      return res.status(403).json({
        error: {
          message: 'You are not a member of this band',
          status: 403,
        },
      });
    }

    if (membership.role !== 'LEADER') {
      return res.status(403).json({
        error: {
          message: 'You must be a band leader to perform this action',
          status: 403,
        },
      });
    }

    next();
  } catch (error) {
    console.error('Band leader check error:', error);
    res.status(500).json({
      error: {
        message: 'Server error checking band leader status',
        status: 500,
      },
    });
  }
};

/**
 * Middleware to check if user is band member
 */
const isBandMember = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    const userId = req.user.userId;

    const membership = await prisma.bandMember.findUnique({
      where: {
        bandId_userId: {
          bandId,
          userId,
        },
      },
    });

    if (!membership) {
      return res.status(403).json({
        error: {
          message: 'You are not a member of this band',
          status: 403,
        },
      });
    }

    next();
  } catch (error) {
    console.error('Band member check error:', error);
    res.status(500).json({
      error: {
        message: 'Server error checking band membership',
        status: 500,
      },
    });
  }
};

module.exports = {
  authenticateJWT,
  isBandLeader,
  isBandMember,
};