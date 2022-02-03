export class HandlerError extends Error {
    code: number = 500
    constructor(
        message: string = "알 수 없는 오류가 발생했어요",
        code?: number
    ) {
        super(message)
        this.code = code
    }
}
