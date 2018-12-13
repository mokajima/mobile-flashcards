import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/'
import { addCardToDeck } from '../utils/api'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

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
      <View>
        <TextInput
          value={question}
          onChangeText={(question) => this.setState({question})}
          placeholder="Question"
        />
        <TextInput
          value={answer}
          onChangeText={(answer) => this.setState({answer})}
          placeholder="Answer"
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps)(NewCard)
