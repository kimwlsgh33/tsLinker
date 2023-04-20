import {downloadAsync} from 'expo-file-system'
import type {FileSystemDownloadResult} from 'expo-file-system'
import {getCachePath, getDocPath} from './path'

// 다른 서버의 파일을 다운로드 받을 수 있음
export const downloadP = downloadAsync

// uri에 접속해서 파일을 받은뒤, DocDir/filename으로 저장
export const downloadToDocDirP = (uri: string, filename: string) =>
  new Promise<FileSystemDownloadResult>(async (resolve, reject) => {
    downloadP(uri, getDocPath(filename)).then(resolve).catch(reject)
  })

// uri에 접속해서 파일을 받은뒤, CacheDir/filename으로 저장
export const downloadToCacheDirP = (uri: string, filename: string) =>
  new Promise<FileSystemDownloadResult>(async (resolve, reject) => {
    downloadP(uri, getCachePath(filename)).then(resolve).catch(reject)
  })

//
