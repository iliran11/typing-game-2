import { connect } from 'react-redux';
import ProfileTabs from './ProfileTabs';
import { RootState, DeviceType } from 'src/types/typesIndex';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const currentPlatform = state.myData.platform;
  return {
    platform:
      currentPlatform === DeviceType.UNKNOWN
        ? DeviceType.MOBILE
        : currentPlatform
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTabs);
