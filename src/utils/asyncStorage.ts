import AsyncStorage from '@react-native-async-storage/async-storage'

export const writeToStorage = (key: string, value: string) =>
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value).then(resolve).catch(reject)
  })

export const readFromStorage = (key: string) =>
  new Promise<string>((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value && value.length > 0) {
          resolve(value)
        } else resolve('')
      })
      .catch(reject)
  })
// key에 맞는 값이 없으면, null이아닌 '' 문자열 반환하게만들기

export const removeToStorage = (key: string) =>
  new Promise((resolve, reject) => {
    AsyncStorage.removeItem(key).then(resolve).catch(reject)
  })
