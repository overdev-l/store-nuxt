import type { Request, Result } from '../types/result'
export const request = <T>(body: Request<T>) => $fetch<Result<any>>("/api/proxy", {
    method: "POST",
    body: {
        ...body,
        headers: {
            Authorization: localStorage.getItem("token") ?? ""
        }
    }
}).then((response) => {
    if (response.code !== 1) {
        ElMessage({
            type: "error",
            message: response.message
        })
    }
    return response
}).catch(e => {
    console.log(e)
    return e
})