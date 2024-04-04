const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://khizarshaikh:Khizar%40spaceheartCluster2922@spaceheartcluster.k4wtt10.mongodb.net/spaceheart';
const Schema = mongoose.Schema;


// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Schema for personal information of user
const PersonalInfoSchema = new Schema({
    age: { type: Number, required: false },
    gender: { type: String, enum: ['male', 'female', 'other'], required: false },
    phoneNo: { type: String, required: false }
});

// Schema of User
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personalInfo: { type: PersonalInfoSchema, required: false }
});

const UserModel = mongoose.model('details', UserSchema);

async function insertUser(userData) {
    try {
        // Destructure userData
        const { name, password, email } = userData;
        if(checkemail(email)){
            return {status:false, message: "Email is Already Taken"}
        }
        // Create a new user instance
        const newUser = new UserModel({
            name: name,
            email: email,
            password: password
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log('done')
        console.log('User inserted successfully:', savedUser);
        return { data: savedUser, status: true };
    } catch (error) {
        console.error('Error inserting user:', error);
        return { data: error.message, status: false }
    }
}


async function checkemail(email) {
    try {
        const found = await UserModel.findOne({ email: email })
        // console.log(found,!found,!!found);
        return { res: !!found,og:found ,msg: 'Email Already Exists' };
    } catch (error) {
        console.error('error at finding email', error)
        return { res: false, msg: error.message }
    }
}

module.exports = {
    insertUser,
}