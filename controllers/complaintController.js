const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const complaintData = req.body;
    if (req.file) {
      complaintData.picture = req.file.path;
    }
    const result = await Complaint.createComplaint(complaintData);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudentComplaints = async (req, res) => {
  try {
    const { roll_no } = req.params;
    const complaints = await Complaint.getComplaintsByStudent(roll_no);
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.getAllComplaints();
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaint_id } = req.params;
    const { status } = req.body;
    const result = await Complaint.updateComplaintStatus(complaint_id, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFilteredComplaints = async (req, res) => {
  try {
    const filter = req.query;
    const complaints = await Complaint.getComplaintsByFilter(filter);
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getComplaintTypes = async (req, res) => {
  try {
    const types = await Complaint.getComplaintTypes();
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { roll_no, password } = req.body;
    const student = await Complaint.studentLogin(roll_no, password);
    if (student) {
      res.status(200).json({ success: true, data: student });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const admin = await Complaint.adminLogin(name, password);
    if (admin) {
      res.status(200).json({ success: true, data: admin });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const result = await Complaint.registerStudent(studentData);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};