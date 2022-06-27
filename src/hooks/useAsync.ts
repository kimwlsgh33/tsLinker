import {useCallback, useEffect, useState} from 'react';

// Promise 반환 함수, 의존성배열 받아옴
export const useAsync = <T>(
  asyncCallback: () => Promise<T>,
  deps: any[] = [],
): [Error | null, () => void] => {
  // 에러관리 state 만들기
  const [error, setError] = useState<Error | null>(null);

  // 의존성 배열 변경시 Promise 반환 함수 실행, 에러시 setError로 설정 후 재렌더링
  useEffect(() => {
    asyncCallback().catch(setError);
  }, deps);
  // 에러리셋 함수 만듬
  const resetError = useCallback(() => setError(null), []);
  return [error, resetError];
};
