import { connect } from 'react-redux';
import Home from './HomePage';
import { initAuthenticationManager } from '../../store/authAction';

const mapDispatchToProps = { initAuthenticationManager };
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
