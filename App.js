import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DecksList from './components/DecksList';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import { getCurrentRouteName } from './utils/helpers';
import { black, white } from './utils/colors';

const DecksNavigator = TabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: 'DECKS'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'NEW DECK'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  DeckTabs: {
    screen: DecksNavigator,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail
  }
});

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <MainNavigator
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
