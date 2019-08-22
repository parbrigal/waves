const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    featured: {
        required:true,
        type : array,
        default:[],
    },
    siteInfo : {
        required:true,
        type : array,
        default:[],
    }

})

const Site = mongoose.model('Site',siteSchema);

module.exports = { Site };