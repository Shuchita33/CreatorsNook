import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    userId:String,
    email:String,
    displayname:String,
    contact:String,
    bio: String,
    website: String,
    location: String,
    birthdate: Date,
    profilePicture: String,
    postsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
});

const Profile=mongoose.model('Profile',profileSchema);
export default Profile;