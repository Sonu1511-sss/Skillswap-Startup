// src/controllers/userController.js
import User from '../models/UserModel.js';


 // -------------------------------- Get All user Dashboard-------------------------------
export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ----------------------------------Get UserByID-------------------------------

export const getUserById  = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error)
{
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//--------------------------Update Profile------------------------------------------------------
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, location, skillsOffered, skillsWanted, availability, profilePicture ,github, linkedin  } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    user.name = name || user.name;
    user.location = location || user.location;
    user.skillsOffered = skillsOffered || user.skillsOffered;
    user.skillsWanted = skillsWanted || user.skillsWanted;
    user.availability = availability || user.availability;
    user.profilePicture = profilePicture || user.profilePicture;
    user.github = github || user.github;
    user.linkedin = linkedin || user.linkedin;

    const updatedUser = await user.save();
    
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//----------------------------------AddReview----------------------------------------
export const addReviewToUser = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewedUserId = req.params.id; // The ID of the user being reviewed
    const reviewerId = req.user.id; // The ID of the logged-in user (reviewer)
    const reviewerName = req.user.name; // The name of the logged-in user

    if (reviewedUserId === reviewerId) {
      return res.status(400).json({ success: false, message: 'You cannot review yourself.' });
    }

    const userToReview = await User.findById(reviewedUserId);

    if (!userToReview) {
      return res.status(404).json({ success: false, message: 'User to review not found' });
    }
    
    // Check if the user has already reviewed this person
    const alreadyReviewed = userToReview.reviews.find(
      (r) => r.reviewerId.toString() === reviewerId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this user.' });
    }

    // Create the new review object
    const review = {
      reviewerId,
      reviewerName,
      rating: Number(rating),
      comment,
    };

    // Add the new review to the user's reviews array
    userToReview.reviews.unshift(review);

    await userToReview.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};