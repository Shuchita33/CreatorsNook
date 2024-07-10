import PostMessage from '../models/postMessage.js';
import Profile from '../models/Profile.js';

const ProfileMetrics = async (req, res, next) => {
    const { id } = req.params; // userId
    try {
        const posts = await PostMessage.find({ creator: id });
        const likesCount = posts.reduce((acc, post) => acc + post.likes.length, 0);
        const commentsCount = posts.reduce((acc, post) => acc + post.comments.length, 0);
        const postsCount = posts.length;

        await Profile.findOneAndUpdate(
            { userId: id },
            { likesCount, commentsCount, postsCount },
            { new: true }
        );

        next();
    } catch (error) {
        res.status(500).json({ message: "Error counting profile metrics" });
    }
};

export default ProfileMetrics;
