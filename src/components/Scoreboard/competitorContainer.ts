import { connect } from 'react-redux';
import { RootState } from '../../types';
import Competitor from './Competitor';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';

const mapStateToProps = (state: RootState, props: any) => {
  const { id, index } = props;
  const randomAvatarIndex =
    id !== EMPTY_COMPETITOR_SLOT
      ? state.serverStatus.players[index].avatar
      : -1;
  return {
    randomAvatarIndex
  };
};

export default connect(
  mapStateToProps,
  null
)(Competitor);i