const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/user.routes");
const userRoutes = require("./routes/user.routes");


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use('/api/exams', require('./routes/exam.routes'));


app.get('/', (req, res) => {
    res.send('Backend running successfully!');
});

module.exports = app;