import { connect } from 'react-redux';
import RenderlessInitiator from './renderlessInitiator';
import {
  initAuthenticationManager,
  initSocketManager,
  initTouchFlag
} from '../../store/initiatorsActions';
const mapDispatchToProps = {
  initSocketManager,
  initAuthenticationManager,
  initTouchFlag
};

export const RenderlessInitiatorContainer = connect(
  null,
  mapDispatchToProps
)(RenderlessInitiator);
