const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const userRoutes = require('./routes/userRoute');
const niyyatRoutes = require('./routes/niyyatRoute');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prisma API with MySQL',
      version: '1.0.0',
      description: 'API documentation for Prisma with Node.js and MySQL',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/users', userRoutes);
app.use('/niyyat', niyyatRoutes);

module.exports = app;
