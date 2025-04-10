const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Student routes
router.post('/login/student', complaintController.studentLogin);
router.post('/register/student', complaintController.registerStudent);
router.post('/complaints', upload.single('picture'), complaintController.createComplaint);
router.get('/complaints/student/:roll_no', complaintController.getStudentComplaints);

// Admin routes
router.post('/login/admin', complaintController.adminLogin);
router.get('/complaints', complaintController.getAllComplaints);
router.put('/complaints/:complaint_id/status', complaintController.updateComplaintStatus);
router.get('/complaints/filter', complaintController.getFilteredComplaints);

// Common routes
router.get('/complaint-types', complaintController.getComplaintTypes);

module.exports = router;