import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stayCurrentWifi, setCurrentWifi } from '../../redux/actions/Wifi';
import DefaultSelection from './DefaultSelection';
import OnConnecting from './OnConnecting';





const ConnectDefault = (props) => {
  if (props.defaultWifi === null && props.stayCurrent === false) return null;

  const [isConnecting, setIsConnecting] = useState(false)
  return (
    <React.Fragment>
      <DefaultSelection {...props} isConnecting={isConnecting} onConnect={() => setIsConnecting(true)} />
      <OnConnecting isConnecting={isConnecting} />
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stayCurrentWifi,
      setCurrentWifi,
    },
    dispatch,
  );

const mapStateToProps = (state) => ({
  currentWifi: state.currentWifi,
  defaultWifi: state.defaultWifi,
  stayCurrent: state.stayCurrent,
  storedWifi: state.storedWifi,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDefault);
