export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await $fetch(body.url, {
      baseURL: 'http://127.0.0.1:4000',
      method: body.method,
      body: body.data,
      headers: body.headers
    })
  })