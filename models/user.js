import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  photoURL: String,
});

const User = mongoose.model('User', userSchema);

export default User;