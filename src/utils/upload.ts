import {FileSystemUploadType, uploadAsync} from 'expo-file-system'
import {existsP} from './info'
import {getFilename} from './path'

// DocDir, CacheDir에 있는 파일을, 외부 서버로 보낼 수 있다.
export const uploadP = uploadAsync

// 업로드할 서버 url, 실제 파일 경로 uri 인자로 전달
export const multipartUplaodP = <T>(url: string, fileUri: string) =>
  new Promise<T>(async (resolve, reject) => {
    try {
      // 파일이 DocDir, CacheDir에 존재하는지 확인
      const exists = await existsP(fileUri)

      // 파일이 존재하지 않으면 reject
      if (!exists) reject(new Error(`${getFilename(fileUri)} not found`))

      // 웹서버 표준 방식 multipart/form-data 방식으로 업로드
      const result = await uploadP(url, fileUri, {
        uploadType: FileSystemUploadType.MULTIPART,
        httpMethod: 'POST',
        fieldName: 'file',
        headers: {
          mode: 'cors',
          cache: 'no-cache',
          credential: 'same-origin'
        }
      })

      // 정상시 body 요소 반환
      resolve(JSON.parse(result.body))
    } catch (e) {
      reject(e)
    }
  })

export const multipartUploadWithJWTP = <T>(
  url: string,
  fileUri: string,
  jwt: string
) =>
  new Promise<T>(async (resolve, reject) => {
    try {
      const exists = await existsP(fileUri)
      if (!exists) reject(`${getFilename(fileUri)} not found`)
      const result = await uploadP(url, fileUri, {
        uploadType: FileSystemUploadType.MULTIPART,
        httpMethod: 'POST',
        fieldName: 'file',
        headers: {
          mode: 'cors',
          cache: 'no-cache',
          credential: 'same-origin',
          Authorization: `Bearer ${jwt}`
        }
      })

      resolve(JSON.parse(result.body))
    } catch (e) {
      reject(e)
    }
  })
