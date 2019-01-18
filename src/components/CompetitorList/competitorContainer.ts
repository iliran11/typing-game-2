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
  if (props.playerAvatar) {
    return {
      playerAvatar: props.playerAvatar
    };
  } else {
    const playerAvatar: PlayerAvatar =
      id !== EMPTY_COMPETITOR_SLOT
        ? state.serverStatus.players[index].avatar
        : emptyAvatar;
    return { playerAvatar };
  }
};

export default connect(
  mapStateToProps,
  null
)(Competitor);
