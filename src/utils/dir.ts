import {
  makeDirectoryAsync,
  deleteAsync,
  readDirectoryAsync
} from 'expo-file-system'

// 이름 단축
export const mkdirP = makeDirectoryAsync
export const rmdirP = deleteAsync
export const readDirP = readDirectoryAsync
