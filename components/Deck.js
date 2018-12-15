import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

function Deck(props) {
  const { deck } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5
  }
})

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck)
