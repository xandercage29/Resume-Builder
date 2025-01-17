//For frontend i use react.js and for backend node.js/express
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Preview from './components/Preview';

const App = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    education: [],
    experience: [],
    skills: []
  });

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/">Personal Info</Link>
          <Link to="/education">Education</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/preview">Preview</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <PersonalInfo 
              data={resumeData.personalInfo} 
              updateData={(data) => updateResumeData('personalInfo', data)} 
            />
          </Route>
          <Route path="/education">
            <Education 
              data={resumeData.education} 
              updateData={(data) => updateResumeData('education', data)} 
            />
          </Route>
          <Route path="/experience">
            <Experience 
              data={resumeData.experience} 
              updateData={(data) => updateResumeData('experience', data)} 
            />
          </Route>
          <Route path="/skills">
            <Skills 
              data={resumeData.skills} 
              updateData={(data) => updateResumeData('skills', data)} 
            />
          </Route>
          <Route path="/preview">
            <Preview resumeData={resumeData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// components/PersonalInfo.js
import React, { useState, useEffect } from 'react';

const PersonalInfo = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: ''
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formData);
  };

  return (
    <div className="form-section">
      <h2>Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Professional Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
};

export default PersonalInfo;

// components/Education.js
import React, { useState, useEffect } from 'react';

const Education = ({ data, updateData }) => {
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  useEffect(() => {
    if (data) {
      setEducationList(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = [...educationList, formData];
    setEducationList(newList);
    updateData(newList);
    setFormData({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
  };

  const handleDelete = (index) => {
    const newList = educationList.filter((_, i) => i !== index);
    setEducationList(newList);
    updateData(newList);
  };

  return (
    <div className="form-section">
      <h2>Education</h2>
      {educationList.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.school}</h3>
          <p>{edu.degree} in {edu.field}</p>
          <p>{edu.startDate} - {edu.endDate}</p>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>School:</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Degree:</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Field of Study:</label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="month"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="month"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>GPA:</label>
          <input
            type="number"
            name="gpa"
            step="0.01"
            min="0"
            max="4"
            value={formData.gpa}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Education</button>
      </form>
    </div>
  );
};

export default Education;
