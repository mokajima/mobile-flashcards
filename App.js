import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import reducer from './reducers'
import middleware from './middleware'
import DecksList from './components/DecksList'
import DeckPage from './components/DeckPage'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar />
    </View>
  )
}

const Tabs = createAppContainer(createBottomTabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="book" color={tintColor} size={30} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square-o" color={tintColor} size={30} />
    }
  }
}, {
  tabBarOptions: {
    inactiveTintColor: '#bbb',
    activeTintColor: '#15b394',
    style: {
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderTopColor: '#ddd',
      height: 56
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
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: '#15b394',
    headerStyle: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#ddd'
    },
    headerTitleStyle: {
      color: '#000000'
    }
  }
}))

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
