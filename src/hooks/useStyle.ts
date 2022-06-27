import {useMemo} from 'react';

// 스타일 받아서 캐시에 저장하는 훅
export const useStyle = (style: object, deps: any[] = []) => {
  return useMemo(() => style, deps);
};
