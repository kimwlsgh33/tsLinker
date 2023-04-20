// react navigation 라우트 타입 지정해주기
declare namespace ReactNavigation {
  interface RootParamList {
    Home: undefined
    HomeLeft: undefined
    HomeRight: {name: string; age: number}
    HomeNavigator: undefined
    Login: undefined
    SignUp: undefined
    TabNavigator: undefined
    Uploaded: {uri: string; name: string}
  }
}
