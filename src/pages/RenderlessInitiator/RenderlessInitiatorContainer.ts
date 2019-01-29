import { connect } from 'react-redux';
import RenderlessInitiator from './renderlessInitiator';
import {
  initAuthenticationManager,
  initSocketManager
} from '../../store/initiatorsActions';
const mapDispatchToProps = {
  initSocketManager,
  initAuthenticationManager
};

export const RenderlessInitiatorContainer = connect(
  null,
  mapDispatchToProps
)(RenderlessInitiator);
