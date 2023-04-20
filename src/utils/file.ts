import {
  EncodingType,
  readAsStringAsync,
  readDirectoryAsync,
  writeAsStringAsync
} from 'expo-file-system'
import {getExtensionWithoutDot} from './path'

// 파일 문자열로 읽어오기 ( 인코딩 기능 사용가능 )
export const readStringP = readAsStringAsync
// 파일 문자열로 쓰기
export const writeStringP = writeAsStringAsync

// Image 컴포넌트에 source 속성으로 사용할 수 있는, base64 문자열로 인코딩하기
export const readImageAsBase64EncodeingP = (fileUri: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      // 파일 확장자 가져오기
      const ext = getExtensionWithoutDot(fileUri)

      // base64 형식으로 인코딩하기
      const base64 = await readStringP(fileUri, {
        encoding: EncodingType.Base64
      })

      // source 속성 형식으로 만들기
      resolve(`data:image/${ext};base64,` + base64)
    } catch (e) {
      // 에러시 reject 형식으로 만들기
      reject(e)
    }
  })

export const readDocDir = (fileUri: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await readDirectoryAsync(fileUri)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
