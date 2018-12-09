import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

function Deck(props) {
  const { deck } = props

  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
    </View>
  )
}

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck)
