import { db } from "../db.js";

export const saveProfile = (req, res) => {
  const { full_name, company, job_title, address, work, email, website } = req.body;

  if (!full_name || !company || !job_title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO code (full_name, company, job_title, address, work, email, website) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(sql, [full_name, company, job_title, address, work, email, website], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(201).json({ message: "Profile saved successfully"});
  });
};

export const getProfiles = (req, res) => {
  const sql = "SELECT * FROM code";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(200).json(results);
  });
};

export const getProfileById = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM code WHERE id = ${id}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(200).json(results);
  });
};

export const removeProfileById = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM code WHERE id = ${id}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(200).json(results);
  });
};

export const editProfile = (req, res) => {
  const { id } = req.params; // Get ID from URL parameters
  const { full_name, company, job_title, address, work, email, website } = req.body;

  // Validate required fields
  if (!id || !full_name || !company || !job_title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // SQL query to update profile
  const sql =
    "UPDATE code SET full_name = ?, company = ?, job_title = ?, address = ?, work = ?, email = ?, website = ? WHERE id = ?";

  // Execute the SQL query
  db.query(sql, [full_name, company, job_title, address, work, email, website, id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
};

