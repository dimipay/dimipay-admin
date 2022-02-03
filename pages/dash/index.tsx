import { Description } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { useState } from "react"
import { Sidebar } from "./partial"

export const Dash = () => {
    return (
        <Hexile fillx filly>
            {Sidebar}
            <Vexile fillx filly x="center" y="center">
                <Description>왼쪽 메뉴에서 내용을 선택해주세요</Description>
            </Vexile>
        </Hexile>
    )
}

export default Dash
