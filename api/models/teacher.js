var mongoose = require('mongoose');
// Setup schema
var teacherSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
});

// Export model

var Teacher = module.exports = mongoose.model('teacher', teacherSchema);
module.exports.get = function (callback, limit) {
    Teacher.find(callback).limit(limit);
}