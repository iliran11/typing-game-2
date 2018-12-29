import { connect } from 'react-redux';
import MyProfilePage from './MyProfilePage';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  const fullName = `${state.myData.firstName} ${state.myData.lastName}`;
  const myLevel = 1;
  return {
    fullName,
    myLevel
  };
};

export default connect(
  mapStateToProps,
  null
)(MyProfilePage);
