import React from 'react';
import { View, Text, Button } from 'react-native';
import { INDEX_PAGE, VENT_SELECT_PAGE } from '../../constants/Navigation';

const ConfigDone = (props) => {
  if (props.step !== props.active) {
    return null;
  }

  return (
    <View>
      <Text>Config is saved, restart the vent</Text>
      <Button onPress={() => props.onClick()} title='Back to Wifi Select--' />
    </View>
  );
};

export default ConfigDone;
