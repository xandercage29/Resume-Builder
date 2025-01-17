const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/resume-builder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Resume Schema
const resumeSchema = new mongoose.Schema({
    userId: String,
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        summary: String
    },
    education: [{
        school: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        gpa: Number
    }],
    experience: [{
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        description: [String]
    }],
    skills: [{
        category: String,
        skills: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

// Routes
app.post('/api/resumes', async (req, res) => {
    try {
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/resumes/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/resumes/:id', async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/resumes/:id', async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
