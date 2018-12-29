import { connect } from 'react-redux';
import UserAvatar from './ActiveUserAvatar';
import { pictureByFacebookId } from '../../utilities';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    picture: pictureByFacebookId(state.myData.facebookId)
  };
};

export default connect(
  mapStateToProps,
  null
)(UserAvatar);
