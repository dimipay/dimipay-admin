export class HandlerError extends Error {
    code = 500
    constructor(
        message = "알 수 없는 오류가 발생했어요",
        code?: number,
        info?: unknown,
    ) {
        super(message)
        console.log("오류 발생!", message, info)
        if (code) this.code = code
    }

    static isHandlerError(d: any): d is HandlerError {
        return d?.isHandlerError === true
    }
}
