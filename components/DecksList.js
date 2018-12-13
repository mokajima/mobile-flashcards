import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import Deck from './Deck'

class DecksList extends Component {
  componentDidMount() {
    this.props.dispatch(receiveDecks({
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    }))
  }

  render() {
    const { decks, navigation } = this.props

    return (
      <View>
        {Object.keys(decks).map((title) => (
          <TouchableOpacity
            key={title}
            onPress={() => navigation.navigate('DeckPage', { title })}
          >
            <Deck title={title} />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksList)
