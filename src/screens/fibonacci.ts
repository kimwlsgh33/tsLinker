// 인자로 숫자를 받음
export const fibonacci = (n: number): number => {
  if (n == 0) return 0;
  else if (n == 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
  /*
    재귀 함수
    n = 5
  */
};
