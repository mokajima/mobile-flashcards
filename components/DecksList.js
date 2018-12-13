import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { setDummyData, getDecks } from '../utils/api'
import Deck from './Deck'

class DecksList extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
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
