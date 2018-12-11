import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleSubmit = () => {
    const { title } = this.state

    this.props.dispatch(addDeck(title))

    this.setState({
      title: ''
    })
  }

  render() {
    const { title } = this.state

    return (
      <View>
        <TextInput
          value={title}
          onChangeText={(title) => this.setState({title})}
          placeholder="Deck Title"
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(NewDeck)
