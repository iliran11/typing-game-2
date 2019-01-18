import { connect } from 'react-redux';
import { RootState } from '../../types';
import Competitor from './Competitor';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';
import { PlayerAvatar } from '../../types';

const mapStateToProps = (state: RootState, props: any) => {
  const { id, index } = props;
  const emptyAvatar: PlayerAvatar = {
    isAnonymous: true,
    picture: -1
  };
  return { playerAvatar: emptyAvatar };
  if (props.playerAvatar) {
    return {
      playerAvatar: props.playerAvatar
    };
  } else {
    // const playerAvatar: PlayerAvatar =
    // id !== EMPTY_COMPETITOR_SLOT
    //   ? state.serverStatus.playersGameStatus[index].avatar
    //   : emptyAvatar;
    // return { playerAvatar };
    return { emptyAvatar };
  }
};

export default connect(
  mapStateToProps,
  null
)(Competitor);
