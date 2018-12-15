import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const UDACICARDS_NOTIFICATION_KEY = 'UDACICARDS_NOTIFICATION_KEY'

function createNotification() {
  return {
    title: "Let's study!",
    body: "👋 don't forget to study today!",
    ios: {
      sound: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(UDACICARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduledLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(UDACICARDS_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(UDACICARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
