import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  state = {
    answers: [],
    showAnswer: false
  }

  toggleAnswer = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  handleCorrectAnswer = () => {
    this.setState((state) => ({
      answers: state.answers.concat(1),
      showAnswer: false
    }))
  }

  handleIncorrectAnswer = () => {
    this.setState((state) => ({
      answers: state.answers.concat(0),
      showAnswer: false
    }))
  }

  reset = () => {
    this.setState({
      answers: [],
      showAnswer: false
    })
  }

  render() {
    const { answers, showAnswer } = this.state
    const { deck, title, navigation } = this.props

    const correctAnswers = answers.filter((answer) => answer)

    if (answers.length === deck.questions.length) {
      return (
        <View>
          <Text>{correctAnswers.length}</Text>
          <TouchableOpacity onPress={this.reset}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DeckPage', { title })}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View>
        <Text>{answers.length + 1}/{deck.questions.length}</Text>
        {showAnswer
          ? (
            <View>
              <Text>{deck.questions[answers.length].answer}</Text>
              <TouchableOpacity onPress={this.toggleAnswer}>
                <Text>Question</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View>
              <Text>{deck.questions[answers.length].question}</Text>
              <TouchableOpacity onPress={this.toggleAnswer}>
                <Text>Answer</Text>
              </TouchableOpacity>
            </View>
          )}
        <TouchableOpacity onPress={this.handleCorrectAnswer}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleIncorrectAnswer}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: decks[title],
    title
  }
}

export default connect(mapStateToProps)(Quiz)
