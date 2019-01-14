import { connect } from 'react-redux';
import UserAvatar from './ActiveUserAvatar';
import { pictureByFacebookId } from '../../utilities';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  const picture = pictureByFacebookId(state.authentication.playerId);
  return { picture };
};

export default connect(
  mapStateToProps,
  null
)(UserAvatar);
