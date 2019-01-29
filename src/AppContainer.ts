import { connect } from 'react-redux';
import App from './App';
import { RootState } from './types';

const mapDispatchToProps = {};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
