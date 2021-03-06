import { connect } from 'react-redux';
import UserAvatar from './ActiveUserAvatar';
import { pictureByFacebookId } from '../../utilities';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const picture = pictureByFacebookId(
    state.authentication.playerId,
    ownProps.height
  );
  return { picture };
};

export const ActiveUserAvatarContainer =  connect(
  mapStateToProps,
  null
)(UserAvatar);
