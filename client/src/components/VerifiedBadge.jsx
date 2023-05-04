import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import verifiedBadgeStyles from '../styles/verifiedBadge';

function VerifiedBadge() {
  const classes = verifiedBadgeStyles();
  return (
    <div className={classes.verified}>
      <CheckCircleIcon className={classes.icon} />
      <Typography variant="body2">Verified</Typography>
    </div>
  );
}

export default VerifiedBadge;