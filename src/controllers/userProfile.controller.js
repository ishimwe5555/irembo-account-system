import { userProfileServices, userServices } from '../services';

const userProfileController = async (req, res) => {
  const userId = req.user.id;
  // const user = await userServices.getUserById(userId);
  const userInfo = await userProfileServices.getProfilesByUser(userId);
  const {
    firstname,
    lastname,
    profilePicture,
    gender,
    birthdate,
    idNumber,
    nationality,
    maritalStatus,
    idImage,
  } = req.body;
  if (!userInfo) {
    const data = {
      userId,
      firstname,
      lastname,
      profile_picture: profilePicture,
      gender,
      birthdate,
      id_number: idNumber,
      nationality,
      marital_status: maritalStatus,
      id_image: idImage,
    };

    await userProfileServices.createUserProfile(data);
  } else {
    const dataUpdate = {};
    if (req.files && req.files.profilePicture) {
      dataUpdate.profile_picture = req.files.profilePicture[0].path;
    }
    if (req.files && req.files.idImage) {
      dataUpdate.id_image = req.files.idImage[0].path;
    }
    if (profilePicture !== undefined) {
      dataUpdate.profile_picture = profilePicture;
    }
    if (gender !== undefined) {
      dataUpdate.gender = gender;
    }
    if (birthdate !== undefined) {
      dataUpdate.birthdate = birthdate;
    }
    if (idNumber !== undefined) {
      dataUpdate.id_number = idNumber;
    }
    if (nationality !== undefined) {
      dataUpdate.nationality = nationality;
    }
    if (maritalStatus !== undefined) {
      dataUpdate.marital_status = maritalStatus;
    }
    if (idImage !== undefined) {
      dataUpdate.id_image = idImage;
    }

    await userProfileServices.updateUserProfiles(userId, dataUpdate);
  }
  const userProfile = await userProfileServices.getProfilesByUser(userId);

  return res.status(201).json({
    code: 201,
    message: 'User profile Successfully updated',
    userProfile,
  });
};

const fetchUserController = async (req, res) => {
  const userId = req.user.id;
  const user = await userServices.getUserById(userId);
  const userInfo = await userProfileServices.getUserProfilesById(user.id);
  return res.status(200).json({
    code: 200,
    message: 'Successfully fetched user',
    user,
    profile: userInfo,
  });
};

export { userProfileController, fetchUserController };
