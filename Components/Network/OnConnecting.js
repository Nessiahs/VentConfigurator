import React from 'react';

import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import { ACTIVITY_INDICATOR_COLOR, ACTIVITY_INDICATOR_LAGRE } from '../../constants/App';
const OnConnecting = (props) => {
    if (props.isConnecting === false) return null;

    return (<React.Fragment><Text>Connect the default wifi</Text>
        <ActivityIndicator
            size={ACTIVITY_INDICATOR_LAGRE}
            color={ACTIVITY_INDICATOR_COLOR}
        /></React.Fragment>)
}


export default OnConnecting
