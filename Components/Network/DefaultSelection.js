import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';


const connectWifi = (defaultSsid, networks, cb) => {
    const connectionData = networks.find((data) => data.ssid === defaultSsid);
    WifiManager.connectToProtectedSSID(
        connectionData.ssid,
        connectionData.password,
        true,
    ).then(() => {
        cb(defaultSsid);
    });
};
const DefaultSelection = (props) => {
    if (props.isConnecting === true) return null;

    return (<View>
        <Text style={styles.headline}>You are not in you default Network</Text>
        <Text style={styles.text}>
            If you are in your default networks the app have the best environment to
            work
      </Text>
        <View style={styles.buttonGroup}>
            <View style={styles.buttonWrapper}>
                <Button title="OK" onPress={() => props.stayCurrentWifi()} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="switch"
                    color="#a4c936"
                    onPress={() => {
                        props.onConnect();
                        connectWifi(
                            props.defaultWifi,
                            props.storedWifi,
                            props.setCurrentWifi,
                        )
                    }
                    }
                />
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    buttonWrapper: {
        padding: 5,
        width: '50%',
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    headline: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    text: {
        padding: 5,
        marginBottom: 20,
    },
});

export default DefaultSelection
