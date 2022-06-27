import {useStyle} from './useStyle';

export const useTransformStyle = (
  transform: Record<string, any>,
  deps: any[] = [],
) => {
  /*
    key 값마다 반복   
   */
  // console.log(Object.keys(transform).map(key => ({[key]: transform[key]})));
  /*
    Object.keys(transform)
    객체의 key값을, 배열형태로 반환

    key => ({
      [key]: transform[key]
    })
  */
  return useStyle(
    {
      transform: Object.keys(transform).map(key => ({[key]: transform[key]})),
    },
    deps,
  );
};
