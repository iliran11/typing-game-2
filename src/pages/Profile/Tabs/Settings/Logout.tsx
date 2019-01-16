import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../../store/authAction';
import Button from '@material-ui/core/Button';

function Logout(props: any) {
  const logout = () => {
    props.logout(props.history);
  };
  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Log Out
    </Button>
  );
}

const mapDispatchToProps = { logout };

export default connect(
  null,
  mapDispatchToProps
)(Logout);
