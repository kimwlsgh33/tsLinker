(
    state: WritableDraft<LoginState>,
    action: { payload: LoginState; type: string; }
) => LoginState | { loggedUser: LoginState; loggedIn: boolean; }

'형식은' 

CaseReducer<LoginState, { payload: any; type: string; }> |
CaseReducerWithPrepare<LoginState, PayloadAction<any, string, any, any>>

/*
'형식에 할당할 수 없습니다.'
  '(state: WritableDraft<LoginState>, action: { payload: LoginState; type: string; }) => LoginState | { loggedUser: LoginState; loggedIn: boolean; }' 형식은 'CaseReducer<LoginState, { payload: any; type: string; }>' 형식에 할당할 수 없습니다.
    'LoginState | { loggedUser: LoginState; loggedIn: boolean; }' 형식은 'void | LoginState | WritableDraft<LoginState>' 형식에 할당할 수 없습니다.
      '{ loggedUser: LoginState; loggedIn: boolean; }' 형식은 'void | LoginState | WritableDraft<LoginState>' 형식에 할당할 수 없습니다.
        '{ loggedUser: LoginState; loggedIn: boolean; }' 형식은 'WritableDraft<LoginState>' 형식에 할당할 수 없습니다.
          'loggedUser' 속성의 형식이 호환되지 않습니다.
            'LoginState' 형식에 'WritableDraft<User>' 형식의 name, email, password 속성이 없습니다.ts(2322)

*/

'() => (dispatch: Dispatch, getState: () => HumorState) => void' 형식은 
'CaseReducer<HumorState, { payload: any; type: string; }> | CaseReducerWithPrepare<HumorState, PayloadAction<any, string, any, any>>' 
형식에 할당할 수 없습니다.


'() => (dispatch: Dispatch, getState: () => HumorState) => void' 형식은 
'CaseReducer<HumorState, { payload: any; type: string; }>' 형식에 할당할 수 없습니다.


  '(dispatch: Dispatch, getState: () => HumorState) => void' 형식은 'void | HumorState | WritableDraft<HumorState>' 형식에 할당할 수 없습니다.ts(2322)