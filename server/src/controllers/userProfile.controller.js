import { userProfileServices, userServices } from '../services';
import { Cloudinary } from '../helpers';

const userProfileController = async (req, res) => {
  const userId = req.user.id;
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
      const profileImage = await Cloudinary.uploader.upload(
        req.files.profilePicture[0].path
      );
      dataUpdate.profile_picture = profileImage.url;
    }
    if (req.files && req.files.idImage) {
      const idPicture = await Cloudinary.uploader.upload(
        req.files.idImage[0].path
      );
      dataUpdate.id_image = idPicture.url;
    }
    // if (profilePicture !== undefined) {
    //   dataUpdate.profile_picture = profilePicture;
    // }
    // if (idImage !== undefined) {
    //   dataUpdate.profile_picture = idImage;
    // }
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
  const profile = await userProfileServices.getProfilesByUser(user.id);
  if (!profile) {
    return res.status(404).json({
      code: 404,
      message: 'User has no profile',
    });
  }
  return res.status(200).json({
    code: 200,
    message: 'Successfully fetched user',
    profile,
  });
};

export { userProfileController, fetchUserController };
