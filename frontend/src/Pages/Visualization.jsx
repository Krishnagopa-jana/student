import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Config';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import '../css/Visualization.css';

const Visualization = () => {
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/marks/my-marks`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched marks data:", res.data);
        setMarks(res.data);
      } catch (error) {
        console.error('Failed to fetch marks:', error.message);
      }
    };

    fetchMarks();
  }, []);

  return (
    <div className="visualization-page">
      <button className="back-button1" onClick={() => navigate('/student')}>
        ← Go Back
      </button>
      <h3>Your Marks Overview</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subjectName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="marksObtained" fill="#8884d8" name="Marks Obtained" />
            <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualization;
