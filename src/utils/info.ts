import {getInfoAsync} from 'expo-file-system'

// 디렉토리나 파일이 존재하는지 확인
export const existsP = (dirOrFile: string) =>
  new Promise(async (resolve, reject) => {
    getInfoAsync(dirOrFile)
      .then((info) => resolve(info.exists))
      .catch(reject)
  })

// 인자가 디렉토리인지 확인
export const isDirP = (dir: string) =>
  new Promise(async (resolve, reject) => {
    getInfoAsync(dir)
      .then((info) => resolve(info.isDirectory))
      .catch(reject)
  })

// 인자가 디렉토리가 아닌지 확인
export const isFileP = (dir: string) =>
  new Promise(async (resolve, reject) => {
    getInfoAsync(dir)
      .then((info) => resolve(false === info.isDirectory))
      .catch(reject)
  })

export const FileUriP = (fileUri: string) =>
  new Promise(async (resolve, reject) => {
    try {
      getInfoAsync(fileUri)
        .then((info) => resolve(info.uri))
        .catch(reject)
    } catch (e) {
      reject(e)
    }
  })
