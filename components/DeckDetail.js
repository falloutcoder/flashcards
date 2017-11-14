import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { black, white } from '../utils/colors';

export default class DeckDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
            backgroundColor: black
        },
        title: navigation.state.params.deckId
    });

    render() {
        const id = this.props.navigation.state.params.deckId;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AddCard', { deckId: id })}
                >
                    <Text style={styles.addCardBtn}>Add Card</Text>
                </TouchableOpacity>
                <Text style={styles.deckTitle}>Details - {id}</Text>
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
    },
    addCardBtn: {
        backgroundColor: black,
        color: white,
        fontWeight: 'bold',
        padding: 20
    }
});
