import React, {useState} from 'react';

export default function myState() {
  const [state, setState] = useState<number>();

  /*
    인자로, number type의 변수를 받거나,
    인자로, number type의 변수를 반환하는 함수를 받고,
    [number, (number)=> void] 형식의 배열을 반환한다.
   */
}
