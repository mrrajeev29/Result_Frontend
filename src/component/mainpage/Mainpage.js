import React, { useState } from 'react';
import './Mainpage.css';
import axios from 'axios';

const ResultPortal = () => {
  const [regNumber, setRegNumber] = useState('');
  const [user, setUser] = useState({}); 
  const [error, setError] = useState('');

  const getUserDetail = async () => {
    try {
      const { data } = await axios.get(`https://result-backend-orns.onrender.com/api/result/${regNumber}`);
      setUser(data); 
    } catch (error) {
      console.error(error);
      setError('Enter a valid registration number...');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await getUserDetail();
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details. Please try again.');
    }
  };

  return (
    <div className="portal-container">
      <h1>Result Portal</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="regNumber">Enter Registration Number:</label>
        <input
          type="text"
          id="regNumber"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          placeholder="Enter your registration number"
          required
        />
        <button type="submit">Get Result</button>
      </form>

      {error && <p className="error">{error}</p>}

      {user && user.Name && ( 
        <div className="result">
          <h2>Result Details</h2>
          <p>
            <strong>Name: {user.Name}</strong>
          </p>
          <p>
            <strong>Registration Number: {user.id}</strong>
          </p>
          <p>
            <strong>Status: {user.Status}</strong>
          </p>
          <h3>Subject-wise Marks</h3>
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {user.Subject &&
                user.Subject.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject}</td>
                    <td>{user.marks[index] ?? 'N/A'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p>
            <strong>Total Marks: {user.total}</strong>
          </p>
          <p>
          <strong>Division: {(user.total>=300? "First":( user.total>=250?"Second":(user.total>=200?"Third":"Sorry, You have not qualified.")))}</strong>

          </p>
        </div>
      )}
    </div>
  );
};

export default ResultPortal;
