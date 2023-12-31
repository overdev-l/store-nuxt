export type Result<T> = {
    code: number
    message: string
    data: T
}

export type Request<T> = {
    url: string,
    method: string,
    data: T
}