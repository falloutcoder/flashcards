import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { gray, black } from '../utils/colors';
import { getAllDecks } from '../api';

export default class DeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { decks: [] };
    }

    componentDidMount() {
        getAllDecks().then(data => this.setState({ decks: Object.values(data) }));
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.decks}
                renderItem={({ item }) => <Deck key={item.title} {...item} />}
            />
        );
    }
}

const Deck = props => (
    <View style={styles.deck}>
        <Text style={styles.deckTitle}>{props.title}</Text>
        <Text style={styles.deckCards}>{props.questions.length} Cards</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deck: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: black
    },
    deckTitle: {
        fontSize: 20
    },
    deckCards: {
        fontSize: 16,
        color: gray
    }
});
