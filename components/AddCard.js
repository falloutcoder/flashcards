import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { black, white } from '../utils/colors';

export default class AddCard extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
            backgroundColor: black
        },
        title: `Add Card for ${navigation.state.params.deckId}`
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>Add Card {this.props.navigation.state.params.deckId}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 20
    }
});
