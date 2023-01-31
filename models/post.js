import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  uid: String,
  book_id: String,
  book_title: String,
  title: String,
  message: String,
  name: String,
  creator: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date()
    }

});

const Post = mongoose.model('Post', postSchema);

export default Post;