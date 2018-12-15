import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class DeckPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }

  render() {
    const { deck, title, navigation } = this.props

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={{textAlign: 'center'}}>
            {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <TextButton
            onPress={() => navigation.navigate('NewCard', { title })}
            buttonStyle={styles.button}
            style={{marginBottom: 20}}
          >
            Add Card
          </TextButton>
          <TextButton
            onPress={() => navigation.navigate('Quiz', { title })}
            buttonStyle={{backgroundColor: '#15b394'}}
            labelStyle={{color: '#fff'}}
          >
            Start Quiz
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
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5
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

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: decks[title],
    title
  }
}

export default connect(mapStateToProps)(DeckPage)
