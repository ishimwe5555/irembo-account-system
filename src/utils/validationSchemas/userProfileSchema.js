import Joi from 'joi';
import errorMessage from '../errormessage';

const userProfileSchema = Joi.object().keys({
  firstname: Joi.string()
    .max(30)
    .allow('')
    .messages(errorMessage('First Name')),
  lastname: Joi.string().max(30).allow('').messages(errorMessage('Last Name')),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .allow('')
    .messages(errorMessage('Gender')),
  birthdate: Joi.date()
    .max('now')
    .allow('')
    .messages(errorMessage('Date of birth')),
  nationality: Joi.string().allow('').messages(errorMessage('Nationality')),
  maritalStatus: Joi.string()
    .max(255)
    .allow('')
    .messages(errorMessage('Marital status')),
  idNumber: Joi.string()
    .max(255)
    .allow('')
    .messages(errorMessage('ID/Passport number')),
  idImage: Joi.string().allow('').messages(errorMessage('ID Image')),
  profilePicture: Joi.string()
    .allow('')
    .messages(errorMessage('Profile Picture')),
});

export default userProfileSchema;
