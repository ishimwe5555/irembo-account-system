import UserProfile from '../database/models/userProfile.model';
import { Cloudinary } from '../helpers';

async function getProfilesByUser(userId) {
  const userInfo = await UserProfile.findOne({
    where: { userId },
  });
  return userInfo;
}
async function createUserProfile(data) {
  const userInfo = await UserProfile.create(data);
  return userInfo;
}
async function updateUserProfiles(userId, data) {
  const userInfo = await UserProfile.update(data, {
    where: { userId },
  });
  return userInfo;
}

async function uploadImage(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}

async function deleteUserProfiles(userId) {
  const newdata = {
    names: '',
    gender: '',
    birthdate: '2000-02-02',
    language: '',
    city: '',
    street: '',
    currency: '',
    postalCode: '',
    country: '',
    accountNumber: '',
    accountName: '',
    telephone: '',
  };
  const nullInfo = await updateUserProfiles(userId, newdata);
  return nullInfo;
}

export default {
  getProfilesByUser,
  createUserProfile,
  deleteUserProfiles,
  updateUserProfiles,
  uploadImage,
};
