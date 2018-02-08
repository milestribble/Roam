const apiFetch = (path, method, body) => {
  const options = {
    method,
    credentials: 'include',
  }
  if (method === 'POST') {
    options.body = body,
    options.headers = {
      'Content-Type': 'application/json',
    }
  } 
  return fetch(`_api/${path}`, options)
    .then(res => res.json())
}

export default apiFetch