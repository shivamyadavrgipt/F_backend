const db = require('../config/db');

const bcrypt = require('bcrypt');

class Complaint {
  static async createComplaint(complaintData) {
    const [result] = await db.query(
      'INSERT INTO complaint SET ?',
      [complaintData]
    );
    return result;
  }

  static async getComplaintsByStudent(roll_no) {
    const [rows] = await db.query(
      `SELECT c.*, ct.type 
       FROM complaint c
       JOIN complaint_type ct ON c.cid = ct.cid
       WHERE c.roll_no = ?`,
      [roll_no]
    );
    return rows;
  }

  static async getAllComplaints() {
    const [rows] = await db.query(
      `SELECT c.*, ct.type, s.name as student_name, s.block, s.room_no
       FROM complaint c
       JOIN complaint_type ct ON c.cid = ct.cid
       JOIN student_details s ON c.roll_no = s.roll_no`
    );
    return rows;
  }

  static async updateComplaintStatus(complaint_id, status) {
    const [result] = await db.query(
      'UPDATE complaint SET status = ? WHERE complaint_id = ?',
      [status, complaint_id]
    );
    return result;
  }

  static async getComplaintsByFilter(filter) {
    let query = `SELECT c.*, ct.type, s.name as student_name, s.block, s.room_no
                 FROM complaint c
                 JOIN complaint_type ct ON c.cid = ct.cid
                 JOIN student_details s ON c.roll_no = s.roll_no`;
    
    const params = [];
    const conditions = [];
    
    if (filter.type) {
      conditions.push('ct.type = ?');
      params.push(filter.type);
    }
    
    if (filter.block) {
      conditions.push('s.block = ?');
      params.push(filter.block);
    }
    
    if (filter.roll_no) {
      conditions.push('c.roll_no = ?');
      params.push(filter.roll_no);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getComplaintTypes() {
    const [rows] = await db.query('SELECT * FROM complaint_type');
    return rows;
  }


  static async studentLogin(roll_no, password) {
    const [rows] = await db.query(
      'SELECT * FROM student_details WHERE roll_no = ?',
      [roll_no]
    );
  
    const student = rows[0];
    if (!student) return null;
  
    const isMatch = await bcrypt.compare(password, student.password);
    return isMatch ? student : null;
  }
  

  static async adminLogin(name, password) {
    const [rows] = await db.query(
      'SELECT * FROM admin WHERE name = ? AND password = ?',
      [name, password]
    );
    return rows[0];
  }
  

  static async registerStudent(studentData) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(studentData.password, 10); // 10 is the salt rounds
    studentData.password = hashedPassword;
  
    const [result] = await db.query(
      'INSERT INTO student_details SET ?',
      [studentData]
    );
    return result;
  }
}

module.exports = Complaint;