import { createTypo } from "./generator"

export const PageHeader = createTypo({
    fontSize: 4.5,
    fontWeight: 600,
    element: "h1",
})
export const Important = createTypo({
    fontSize: 4,
    fontWeight: 600,
    element: "b",
})
export const Regular = createTypo({
    fontSize: 4,
    fontWeight: 400,
})
export const Description = createTypo({
    fontSize: 3.5,
    fontWeight: 400,
    color: "$dark4",
})
export const Token = createTypo({
    fontSize: 3,
    fontWeight: 500,
})
export const Decorative = createTypo({
    fontSize: 5,
    fontWeight: 500,
})
