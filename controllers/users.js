import User from "../models/user.js";

//delete user
export const deleteUser = async (req, res) => {
  const auth = req.currentUser;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    await User.findOneAndDelete({uid: auth.uid});
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
}

//get a user
export const getUser = async (req, res) => {
  const auth = req.currentUser;
  const { id } = req.params;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const user = await User.findOne({ uid: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

//get friends
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
}

// //follow a user // /:id/follow
// export const followUser = async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });
//         res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("you allready follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant follow yourself");
//   }
// }

// //unfollow a user // /:id/unfollow
// export const unfollowUser = async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $pull: { followers: req.body.userId } });
//         await currentUser.updateOne({ $pull: { followings: req.params.id } });
//         res.status(200).json("user has been unfollowed");
//       } else {
//         res.status(403).json("you dont follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant unfollow yourself");
//   }
// }