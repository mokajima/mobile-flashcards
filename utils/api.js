import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'UDACICARDS_STORAGE_KEY'

function setDummyData() {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then((decks) => decks ? JSON.parse(decks) : setDummyData())
}

function getDeck(title) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks))
    .then((decks) => decks[title])
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  getDeck(title)
    .then((deck) => AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          questions: deck.questions.concat(card)
        }
      })))
}
