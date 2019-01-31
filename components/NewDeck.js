import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import TextButton from './TextButton'

class NewDeck extends Component {
  state = {
    title: ''
  }

  /**
   * @description Whether or not all form fields are filled
   * @returns {bool}
   */
  isDisabled = () => {
    return '' === this.state.title.trim()
  }

  /**
   * @description Add the deck to the decks
   */
  handleSubmit = () => {
    const { title } = this.state
    const { decks } = this.props

    if (title in decks && decks.hasOwnProperty(title)) {
      alert(`"${title}" already exists.`)
      return
    }

    this.props.dispatch(addDeck(title))

    this.setState({
      title: ''
    })

    this.props.navigation.navigate('DeckPage', { title })

    saveDeckTitle(title)
  }

  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={(title) => this.setState({title})}
          placeholder="Deck Title"
          style={styles.input}
        />
        <TextButton
          onPress={this.handleSubmit}
          buttonStyle={{backgroundColor: this.isDisabled() ? '#bbbbbb' : '#15b394'}}
          labelStyle={{color: '#fff'}}
          disabled={this.isDisabled()}
        >
          Create Deck
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(NewDeck)
