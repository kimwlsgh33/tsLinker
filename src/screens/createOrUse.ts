const cache: Record<string, any> = {};
// Record : Typescript가 기본으로 제공하는 타입, key : value 형식의 코드에 사용하는 제네릭타입

// cache에 key가 존재하면, value를 반환하고
// cache에 key가 없으면, 함수를 받아 실행한 값을 cache에 저장하고 반환한다.
export default function createOrUse<T>(key: string, callback: () => T) {
  if (!cache[key]) {
    cache[key] = callback();
  }
  return cache[key];
}
