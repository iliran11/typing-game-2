import { connect } from 'react-redux';
import { RootState } from '../../types';
import Competitor from './Competitor';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';
import { PlayerAvatar } from '../../types';

const mapStateToProps = (state: RootState, props: any) => {
  return {};
};

export const CompetitorContainer = connect(
  mapStateToProps,
  null
)(Competitor);
