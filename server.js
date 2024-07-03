require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/authRoutes');
const startupRouter = require('./routes/startupRoutes');
const investorRouter = require('./routes/investorRoutes');
const blogRouter = require('./routes/blogRoutes');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');

// Other middleware and routes

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', userRouter);
app.use('/startups', auth, startupRouter);
app.use('/investors', auth, investorRouter);
app.use('/blogs', blogRouter);

// Database connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
