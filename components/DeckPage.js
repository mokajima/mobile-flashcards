import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

function DeckPage(props) {
  const { deck } = props

  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
      <TouchableOpacity>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  )
}

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(DeckPage)
