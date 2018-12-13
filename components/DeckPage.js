import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

function DeckPage(props) {
  const { deck, title, navigation } = props

  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewCard', { title })}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz', { title })}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  )
}

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: decks[title],
    title
  }
}

export default connect(mapStateToProps)(DeckPage)
