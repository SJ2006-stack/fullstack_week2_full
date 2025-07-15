require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/dbconfig');

const app = express();
const port = 3000;

//  MongoDB connection
connectDB();

app.use(express.json());

// the CRUDe way.....
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
