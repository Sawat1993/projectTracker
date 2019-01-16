const mongoose = require('mongoose');
const Project = require('../models/project');

getProject = (req, res, next) => {
    Project.find()
        .select('_id code name')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        }).catch(error => {
            res.status(500).json({
                message: errora
            })
        })
};

saveProject = (req, res, next) => {
    req.body._id = mongoose.Types.ObjectId();
    const project = new Project(req.body);
    project.save().then(doc => {
        res.status(200).json(doc)
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
};

deleteProject = (req, res, next) => {
    Project.remove({ _id: req.params.projectID }).exec().then(doc => {
        if (doc.n > 0) res.status(200).json({ message: 'Deleted' });
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
};

module.exports = {
    getProject,
    saveProject,
    deleteProject
}