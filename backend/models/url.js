const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const urlSchema = new mongoose.Schema(
    {
        href: {
            type: String
        },
        host: {
            type: String
        },
        pathname: {
            type: String
        },
        search: {
            type: String
        },
        belongsTo: { 
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('URL', urlSchema);
