import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { white, gray, black } from '../utils/colors';
import { saveDeckTitle } from '../api';

export default class AddDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    onSubmit = () => {
        saveDeckTitle(this.state.title);
        this.props.navigation.navigate('DeckList');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    onChangeText={text => {
                        this.setState({ title: text });
                    }}
                    spellCheck={false}
                    underlineColorAndroid={black}
                />
                <TouchableOpacity onPress={this.onSubmit}>
                    <Text style={styles.submitBtn}>Submit</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItem: 'center'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    submitBtn: {
        backgroundColor: black,
        color: white,
        fontWeight: 'bold'
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: white,
        color: black
    }
});
