const mongoose = require('mongoose')

const CredentialSchema = new mongoose.Schema({
    id: String,
    password: String,
    role: String
})

const CredentialModel = mongoose.model("users", CredentialSchema)
module.exports = CredentialModel;
