import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  book_id: {
    type: String,
    required: true,
  },
  book_title: {
    type: String,
    required: true,
  },
  book_cover: String,
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  likes: { type: [String], default: [] },
  comments: [{
    comment: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
    },
    postedAt: {
        type: Date,
        default: new Date(),
    },
  }],
  saves: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("Post", postSchema);

export default PostMessage;
