import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
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
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DeckPage', { title: item })}
              style={styles.deck}
            >
              <Deck title={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20
  },
  deck: {
    marginBottom: 10
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksList)
