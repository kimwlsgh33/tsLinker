import {useCallback, useState} from 'react';

export const useToggle = (
  initialValue: boolean = false,
  deps: any[] = [],
): [boolean, () => void] => {
  // useState로 만들 state의 값 타입 지정
  const [value, setValue] = useState(initialValue);
  // useCallback으로 함수 캐시에 저장 (렌더링 1번만)
  // state를, 현재값과 반대되는 값으로 바꾸어주는 함수
  const toggleValue = useCallback(() => setValue(value => !value), deps);

  // state와 커스텀한 state변경 함수 반환
  return [value, toggleValue];
};
