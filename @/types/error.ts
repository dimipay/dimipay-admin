export class HandlerError extends Error {
    code: number = 500
    constructor(
        message: string = "알 수 없는 오류가 발생했어요",
        code?: number,
        info?: unknown
    ) {
        super(message)
        console.log("오류 발생!", message, info)
        this.code = code
    }

    static isHandlerError(d: any): boolean {
        return d?.isHandlerError === true
    }
}
