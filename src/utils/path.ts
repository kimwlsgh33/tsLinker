import * as FileSystem from 'expo-file-system'

// 스마트폰의 파일시스템 이용하기

/*
    운영체제가 허용한 영역만 사용가능 ( 로컬 앱 영역 )

    로컬 앱 영역
    - 영원히 지워지지 않는 documentDirectory
    - 임시 저장하는 cacheDirectory
*/

// 무조건 문자열을 반환하도록 설정
export const getDocDir = (): string => FileSystem.documentDirectory ?? ''

// path받아서 0번째 인덱스가 / 이면, / 를 빼고 Doc주소와 합친 문자열 반환
export const getDocPath = (path: string) => {
  return path[0] === '/' ? getDocDir() + path.substring(1) : getDocDir() + path
}

export const getCacheDir = (): string => FileSystem.cacheDirectory ?? ''

// path받아서 0번째 인덱스가 / 이면, / 를 빼고 Cache주소와 합친 문자열 반환
export const getCachePath = (path: string) => {
  return path[0] === '/'
    ? getCacheDir() + path.substring(1)
    : getCacheDir() + path
}

// '/' 문자열을 기준으로 나누고, 마지막 요소인 파일이름을 반환한다.
export const getFilename = (path: string, delim: string = '/') =>
  path.split(delim).reverse()[0]

// 파일이름을 가져와 '.' 문자열을 가준으로 나누고, 마지막 요소인 확장자를 반환온다.
export const getExtensionWithoutDot = (path: string, delim: string = '/') =>
  getFilename(path, delim).split('.').reverse()[0]
