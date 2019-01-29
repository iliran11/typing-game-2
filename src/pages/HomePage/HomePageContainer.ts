import { connect } from 'react-redux';
import Home from './HomePage';


// TODO: delete this file. not needed anymore.

const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
