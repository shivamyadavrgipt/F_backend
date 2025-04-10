const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const complaintRoutes = require('./routes/complaintRoutes');
app.use('/api', complaintRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});
app.get("/hlo",(req,res)=>{
  res.send("fgs");
});
app.use((req,res,next)=>{
  console.log(req.body);
  next();
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
