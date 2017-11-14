import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import { getCurrentRouteName } from './utils/helpers';

const DecksNavigator = TabNavigator({
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  },
  Decks: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  }
});

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <DecksNavigator
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);
            if (prevScreen !== currentScreen) {
              this.setState({ DecksNavigator: currentScreen });
            }
          }}
          screenProps={{ currentScreen: this.state.DecksNavigator }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
