const mongoose = require('mongoose');
const { Collection } = require('../config/Collection');
const UploadSchema = new mongoose.Schema({
    name:String,
    image:String
},{timestamps:true})

const uploadModel = mongoose.model(Collection.upload,UploadSchema);
module.exports  =  uploadModel