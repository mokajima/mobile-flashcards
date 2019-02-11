import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  /**
   * @description Whether or not all form fields are filled
   * @returns {bool}
   */
  isDisabled = () => {
    const { question, answer } = this.state
    return '' === question.trim() || '' === answer.trim()
  }

  /**
   * @description Add the card to the deck
   */
  handleSubmit = () => {
    const { question, answer } = this.state
    const { title, goBack } = this.props

    const card = {
      question,
      answer
    }

    this.props.dispatch(addCard(title, card))

    this.setState({
      question: '',
      answer: ''
    })

    goBack()
    addCardToDeck(title, card)
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            value={question}
            onChangeText={(question) => this.setState({question})}
            placeholder="Question"
            style={[styles.input, {marginBottom: 10}]}
          />
          <TextInput
            value={answer}
            onChangeText={(answer) => this.setState({answer})}
            placeholder="Answer"
            style={styles.input}
          />
        </View>
        <TextButton
          onPress={this.handleSubmit}
          buttonStyle={{backgroundColor: this.isDisabled() ? '#bbbbbb' : '#15b394'}}
          labelStyle={{color: '#fff'}}
          isDisabled={this.isDisabled()}
        >
          Submit
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
    paddingVertical: 50,
    paddingHorizontal: 20
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

const mapStateToProps = (decks, ownProps) => {
  const { title } = ownProps.navigation.state.params

  return {
    title,
    goBack: () => ownProps.navigation.goBack()
  }
}

export default connect(mapStateToProps)(NewCard)
