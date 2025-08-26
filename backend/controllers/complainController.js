import Complaint from '../models/Complain.js';


const postComplaint =  async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newComplaint = new Complaint({ name, email, message, read: false });
    await newComplaint.save();
    res.json({ success: true, message: "Complaint submitted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const viewComplaint =  async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {viewComplaint, postComplaint}
