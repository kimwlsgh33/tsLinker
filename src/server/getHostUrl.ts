// 호스트 url 가져오는 함수
export const getHostUrl = (path: string) => {
  const protocol = 'http'
  // 서버 ip로 변경
  const ip = '192.168.0.106'
  const port = 4000
  return `${protocol}://${ip}:${port}${path}`
}
