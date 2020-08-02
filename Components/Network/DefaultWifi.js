import React from 'react';
import { TextInput, View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { saveToKeychain } from '../../data/Keychain';
import { bindActionCreators } from 'redux';
import { setDefaultWifi } from '../../redux/actions/Wifi';
import CheckBox from '@react-native-community/checkbox';

class DefaultWif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      password: '',
      stores: false,
      clearPW: false,
    };
  }

  componentDidMount() {
    this.setState({ ssid: this.props.currentWifi });
  }

  async save() {
    this.setState({ stores: true });

    await saveToKeychain(this.state.ssid, this.state.password);
    await saveToKeychain('default', this.state.ssid);
    this.props.setDefaultWifi(this.state.ssid);
  }

  render() {
    if (this.props.defaultWifi !== null) {
      return null;
    }
    return (
      <View>
        <Text style={styles.headline}>
          You don't have a default wifi network
        </Text>
        <View>
          <Text style={styles.label}>SSID:</Text>
          <TextInput
            style={styles.input}
            value={this.state.ssid}
            onChangeText={(text) => this.setState({ ssid: text })}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={!this.state.clearPW}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckBox
              style={{ width: 50 }}
              onValueChange={() => this.setState({ clearPW: !this.state.clearPW })}
              value={this.state.clearPW}
              tintColors={{ true: '#a4c936' }}
            />
            <Text style={{ width: 200 }}>Show password</Text>
          </View>
          <View style={styles.button}>
            <Button
              title={'Save'}
              color="#a4c936"
              disabled={
                this.state.ssid?.length < 2 ||
                this.state.password.length < 5 ||
                this.state.stores === true
              }
              onPress={() => this.save()}
            />
          </View>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDefaultWifi
    },
    dispatch,
  );

const mapStateToProps = (state) => ({
  currentWifi: state.currentWifi,
  defaultWifi: state.defaultWifi,
  currentWifi: state.currentWifi,
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultWif);

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderWidth: 1,
  },
  label: {
    padding: 5,
    fontSize: 16,
  },
  button: {
    paddingTop: 15,
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
