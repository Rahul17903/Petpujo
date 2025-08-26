import React, { useEffect, useState } from "react";
import axios from "axios";

const Complaints = ({url}) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/complaints`)
      .then(res => setComplaints(res.data.complaints))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Complaints</h2>
      <div className="space-y-4">
        {complaints.map((c, idx) => (
          <div key={idx} className="border bg-slate-50 p-4 rounded-lg shadow">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Message:</strong> {c.message}</p>
            <p className="text-sm text-gray-500">Submitted: {new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
