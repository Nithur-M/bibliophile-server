import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  book_id: String,
  book_title: String,
  book_cover: String,
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

const PostMessage = mongoose.model('Post', postSchema);

export default PostMessage;