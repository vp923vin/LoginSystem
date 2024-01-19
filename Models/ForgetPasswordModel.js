const { mongoose } = require('../Config/mongoDB');



const forgertPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
});

const ForgetPassword = mongoose.model('forget_passwords', forgertPasswordSchema);

module.exports = ForgetPassword;