import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  uid: String,
  email: String,
  username: String,
  photoURL: String,
});

const User = mongoose.model('User', userSchema);

export default User;