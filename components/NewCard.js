import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const { title, goBack } = this.props

    this.props.dispatch(addCard(title, {
      question,
      answer
    }))

    this.setState({
      question: '',
      answer: ''
    })

    goBack()
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
