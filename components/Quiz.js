import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    answers: [],
    showAnswer: false
  }

  /**
   * @description Show or hide the answer
   */
  toggleAnswer = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  /**
   * @description Mark as "correct"
   */
  handleCorrectAnswer = () => {
    this.setState((state) => ({
      answers: state.answers.concat(1),
      showAnswer: false
    }))
  }

  /**
   * @description Mark as "incorrect"
   */
  handleIncorrectAnswer = () => {
    this.setState((state) => ({
      answers: state.answers.concat(0),
      showAnswer: false
    }))
  }

  /**
   * @description Reset the quizzes
   */
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

    if (0 === deck.questions.length) {
      return (
        <View style={[styles.container, {paddingTop: 50}]}>
          <Text style={{fontSize: 16}}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
        </View>
      )
    }

    if (answers.length === deck.questions.length) {

      clearLocalNotification()
        .then(setLocalNotification)

      return (
        <View style={[styles.container, {paddingTop: 50}]}>
          <View>
            <Text style={{fontSize: 16}}>Your score is</Text>
            <Text style={styles.title}>
              {Math.floor(100 * correctAnswers.length / answers.length)}%
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <TextButton
              onPress={this.reset}
              buttonStyle={[styles.button, {marginBottom: 10}]}
            >
              Restart Quiz
            </TextButton>
            <TextButton
              onPress={() => navigation.navigate('DeckPage', { title })}
              buttonStyle={{backgroundColor: '#15b394'}}
              labelStyle={{color: '#fff'}}
            >
              Back to Deck
            </TextButton>
          </View>
        </View>
      )
    }

    return (
      <View style={[styles.container, {paddingTop: 20}]}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>{answers.length + 1} / {deck.questions.length}</Text>
          {showAnswer
            ? (
              <View>
                <Text style={styles.title}>{deck.questions[answers.length].answer}</Text>
                <TouchableOpacity
                  onPress={this.toggleAnswer}
                  style={{alignItems: 'center'}}
                >
                  <Text style={{color: '#666'}}>Question</Text>
                </TouchableOpacity>
              </View>
            )
            : (
              <View>
                <Text style={styles.title}>{deck.questions[answers.length].question}</Text>
                <TouchableOpacity
                  onPress={this.toggleAnswer}
                  style={{alignItems: 'center'}}
                >
                  <Text style={{color: '#666'}}>Answer</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <View style={{width: '100%'}}>
          <TextButton
            onPress={this.handleCorrectAnswer}
            buttonStyle={styles.button}
          >
            Correct
          </TextButton>
          <TextButton
            onPress={this.handleIncorrectAnswer}
            buttonStyle={{backgroundColor: '#15b394'}}
            labelStyle={{color: '#fff'}}
          >
            Incorrect
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20
  },
  button: {
    backgroundColor: '#fff',
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    marginBottom: 10
  }
})

const mapStateToProps = (decks, ownProps) => {
  const { title } = ownProps.navigation.state.params

  return {
    deck: decks[title],
    title
  }
}

export default connect(mapStateToProps)(Quiz)
