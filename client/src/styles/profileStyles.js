import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      width: "600px",
    },
  },
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  // paper: {
  //   margin: theme.spacing(4),
  //   padding: theme.spacing(4),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  imageContainer: {
    display: "flex",
   justifyContent: "center",
  },
  profileImage: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // avatar: {
  //   width: theme.spacing(20),
  //   height: theme.spacing(20),
  //   margin: theme.spacing(2),
  // },
  box: {
    margin: theme.spacing(1),
  },
  // divider: {
  //   margin: theme.spacing(2),
  //   width: '100%',
  // },
  input: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    margin: theme.spacing(1),
    background: "#2196f3",
    color: "#fff",
    "&:hover": {
      background: "#1976d2",
    },
  },
  nameAndBadge:{
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
  },
    verifiedBadge:{
      marginRight: 8,
      background: "#2196f3",
  }
}));

export default useStyles;

// import { makeStyles } from '@material-ui/core/styles';

// const profileStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: theme.spacing(4),
//     backgroundColor: '#f9f9f9',
//     minHeight: '100vh',
// //     padding: "20px",

//   },
//     paper: {
//     margin: theme.spacing(4),
//     padding: theme.spacing(4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     position: 'relative',
//     borderRadius: '50%',
//     overflow: 'hidden',
//     marginBottom: theme.spacing(2),
//     width: '200px',
//     height: '200px',
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(2),
//   },
//   formContainer: {
//     maxWidth: '500px',
//     width: '100%',
//   },
//   input: {
//     backgroundColor: 'white',
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   radioGroup: {
//     flexDirection: 'row',
//   },
//   submitButton: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export default profileStyles;
