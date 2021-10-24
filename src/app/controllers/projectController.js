const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('user');

        return res.send({ projects });
    } catch (e) {
        return res.status(400).send({ error: 'Error'});
    }
});

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('user');

        return res.send({ project });
    } catch (e) {
        return res.status(400).send({ error: 'Error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        tasks.map(task => {
            const projecTask = new Task({ ...task, project: project._id });

            projectTask.save().then();
        });

        const project = await Project.create({ ...req.body, user: req.userId });

        return res.send({ project });
    } catch (e) {
        return res.status(400).send({ error: 'Error'});
    }
});

router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});

router.delete('/:projectId', async (req, res) => {
    try {
        const project = await Project.findByIdAndRemove(req.params.projectId).populate('user');

        return res.send();
    } catch (e) {
        return res.status(400).send({ error: 'Error'});
    }
});

module.exports = app => app.use('/projects', router)