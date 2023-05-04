import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import VerifiedBadge from "./VerifiedBadge";
import profileStyles from '../styles/profileStyles';
import defaultImage from '../Assets/4.jpg'
import fetch from '../api/fetch';

const PROFILE_URL = 'users/profile';

const UserProfile = async () => {
  const classes = profileStyles();
  const [editMode, setEditMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("tempLog"))
const token = JSON.parse(localStorage.getItem('cooltoken'))
const response = await fetch.get(PROFILE_URL,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
if(response.ok){
  console.log(response)
}
  const userData = {
      firstName: user.firstname,
      lastName: user.lastname,
      gender: "Male",
      age: "30",
      dob: "01/01/1992",
      maritalStatus: "Single",
      nationality: "American",
      verificationNumber: "",
      verificationImage: null,
  }
  const [profileData, setProfileData] = useState(userData);

  const handleCancel = () => {
    setProfileData({...userData}); // Reset profileData to its original values
    setEditMode(false); // Turn off edit mode
  };
  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };


  const handleVerificationChange = (event) => {
    if (event.target.name === "verificationImage") {
      setProfileData({
        ...profileData,
        verificationImage: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setProfileData({
        ...profileData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    // Get a reference to the form and submit button
const form = document.querySelector('#myForm');
// const submitBtn = document.querySelector('#submitBtn');
    // Submit profile data to server
    try{
      const formData = new FormData(form);
      const response = await fetch.put(PROFILE_URL, formData);
      if (response.ok) {
        // The form was successfully submitted, do something here
        alert('form was submitted')
      } else {
        // Handle the error
        alert('not submitted')
      }
  
    }catch(err){
      console.log(err)
      alert('in the catch')
    }
  };

  return (
    <div className={classes.formContainer}>
    <div className={classes.formWrapper}>
    <Box className={classes.root}>
      <Box className={classes.imageContainer}>
        <img
          src="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg"
          alt="Profile"
          className={classes.profileImage}
        />
      </Box>
      <Box textAlign="center" mb={2}>
        <div className={classes.nameAndBadge}>
        <Typography variant="h5" gutterBottom>
          {`${profileData.firstName} ${profileData.lastName}`}
        </Typography>
        <VerifiedBadge className={classes.verifiedBadge} />
        </div>
        <Typography variant="body1" gutterBottom>
          {`Age: ${profileData.age}`}
        </Typography>
      </Box>
      <form className={classes.form} id="form">
      <Box mt={2} className={classes.box}>
        <TextField
          label="First Name"
          name="firstName"
          value={profileData.firstName}
          // onChange={handleChange}
          disabled
          fullWidth
          
        />
      </Box>
      <Box mt={2} className={classes.box}>
        <TextField
          label="Last Name"
          name="lastName"
          value={profileData.lastName}
          // onChange={handleChange}
          disabled
          fullWidth
        />
      </Box>
      <Box mt={2} className={classes.box}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            disabled={!editMode}
            className={classes.radioGroup}

          >
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mt={2} className={classes.box}>
        <TextField
          label="Age"
          name="age"
          value={profileData.age}
          onChange={handleChange}
          disabled={!editMode}
          fullWidth
        />
      </Box>
      <Box mt={2} className={classes.box}>
  <TextField
    label="Date of Birth"
    name="dob"
    value={profileData.dob}
    onChange={handleChange}
    disabled={!editMode}
    fullWidth
  />
</Box>

<Box mt={2} className={classes.box}>
  <FormControl component="fieldset">
    <FormLabel component="legend">Marital Status</FormLabel>
    <RadioGroup
      aria-label="marital-status"
      name="maritalStatus"
      value={profileData.maritalStatus}
      onChange={handleChange}
      disabled={!editMode}
      className={classes.radioGroup}

    >
      <FormControlLabel
        value="SINGLE"
        control={<Radio />}
        label="Single"
      />
      <FormControlLabel
        value="MARRIED"
        control={<Radio />}
        label="Married"
      />
      <FormControlLabel
        value="DIVORCED"
        control={<Radio />}
        label="Divorced"
      />
      <FormControlLabel
        value="WIDOWED"
        control={<Radio />}
        label="Widowed"
      />
    </RadioGroup>
  </FormControl>
</Box>

<Box mt={2} className={classes.box}>
  <TextField
    label="Nationality"
    name="nationality"
    value={profileData.nationality}
    onChange={handleChange}
    disabled={!editMode}
    fullWidth
    className={classes.textField}

  />
</Box>
<Box mt={2} className={classes.box}>
  <TextField
    label="NID or Passport Number"
    name="passportNumber"
    value={profileData.passportNumber}
    onChange={handleChange}
    disabled={!editMode}
    fullWidth
  />
</Box>
<Box mt={2} className={classes.box}>
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="verification-image-input"
    multiple
    type="file"
    onChange={handleVerificationChange} // Use handleVerificationChange to update the verificationImage state
  />
  <label htmlFor="verification-image-input">
    {/* <Button
      //variant="outlined"
      component="span"
      variant="contained"
      color="primary"
      disabled={!editMode}
      className={classes.uploadButton}
    > */}
         <Button
          variant="contained"
          component="span"
          disabled={!editMode}
          className={classes.uploadButton}
          startIcon={<CloudUploadIcon />}
        >
      Upload Verification Document
    </Button>
  </label>
</Box>

{editMode ? (
  <Box mt={2} className={classes.box}>
    <Button variant="contained" color="primary" onClick={handleSubmit}       className={classes.submitButton}
>
      Save
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleCancel}
      className={classes.submitButton}
    >
      Cancel
    </Button>
  </Box>
) : (
  <Box mt={2} className={classes.box}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditMode}
      className={classes.submitButton}
      id="submitBtn"
    >
      Edit Profile
    </Button>
  </Box>
)}
</form>
</Box>
</div>
</div>
  );
}

export default UserProfile;
