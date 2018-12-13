import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import reducer from './reducers'
import middleware from './middleware'
import DecksList from './components/DecksList'
import DeckPage from './components/DeckPage'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

const Tabs = createAppContainer(createBottomTabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
}))

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckPage: {
    screen: DeckPage
  },
  NewCard: {
    screen: NewCard
  },
  Quiz: {
    screen: Quiz
  }
}))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <MainNavigator />
      </Provider>
    )
  }
}
