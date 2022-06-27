// body에 데이터 전달하며, 요청하기
export const post = <T extends object>(url: string, data: T) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })

// header에 jwt 전달, body에 데이터 전달하며 요청하기
export const postWithJWT = <T extends object>(
  url: string,
  data: T,
  jwt: string
) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify(data)
  })
