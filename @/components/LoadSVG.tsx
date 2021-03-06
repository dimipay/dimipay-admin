import Image from "next/image"

export const LoadSVG: React.FC<{
    width: number
    height: number
    src: string
    alt: string
    color?: string
    onClick?(): void
}> = props => {
    return (
        <div
            onClick={props.onClick}
            style={{
                position: "relative",
                minHeight: props.height + "rem",
                minWidth: props.width + "rem",
            }}>
            <Image src={props.src} layout="fill" alt={props.alt} />
        </div>
    )
}
