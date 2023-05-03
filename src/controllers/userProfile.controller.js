import { userProfileServices, userServices } from '../services';

const userProfileController = async (req, res) => {
  const userId = req.user.id;
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

  const user = await userServices.getUserById(userId);

  let userInfo = await userProfileServices.getUserProfilesById(user.id);

  const dataUpdate = {
    firstname: firstname || userInfo.firstname,
    lastname: lastname || userInfo.lastname,
    gender: gender || userInfo.gender,
    birthdate: birthdate || userInfo.birthdate,
    id_number: idNumber || userInfo.id_number,
    nationality: nationality || userInfo.nationality,
    marital_status: maritalStatus || userInfo.marital_status,
    id_image: idImage || userInfo.id_image,
    profile_picture: profilePicture || userInfo.profile_picture,
  };
  userInfo = await userProfileServices.updateUserProfiles(userId, dataUpdate);
  const info = await userProfileServices.getUserProfilesById(userId);

  return res.status(200).json({
    code: 200,
    message: 'User profile Successfully updated',
    info,
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
