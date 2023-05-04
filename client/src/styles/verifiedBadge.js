import { makeStyles } from '@material-ui/core/styles';

const verifiedBadgeStyles = makeStyles((theme) => ({
    verified: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.success.main,
    },
    icon: {
      marginLeft: theme.spacing(2),
      
      
    },
  }));

  export default verifiedBadgeStyles;