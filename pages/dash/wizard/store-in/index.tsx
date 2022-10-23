import { Button, PlainLink, Ul, WizardFrame } from "@/components"
import { Important, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import Link from "next/link"
import { Sidebar } from "pages/dash/partial"

export const StoreIn = () => {
    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center">
                <WizardFrame
                    title="상품 한번에 입고하기 마법사"
                    description="거래처에서 받은 입고 엑셀파일을 업로드하고 핸디 바코드 리더로 갯수를 검증할 수 있어요"
                    gap={3}>
                    <Regular>
                        <Ul>
                            <li>거래처에서 받은 엑셀 파일을 준비해주세요.</li>
                            <li>
                                핸디 바코드리더가 제대로 연결됐는지 확인해주세요
                            </li>
                            <li>
                                한 상품의 갯수가 모두 확인됐을 때 경쾌한
                                알림음이 재생돼요.
                            </li>
                            <li>
                                입고 이력에는 누가 작업했는지 함께 기록돼요. 꼭
                                본인의 계정으로 로그인하고 작업해주세요
                            </li>
                        </Ul>
                    </Regular>
                    <PlainLink href={"./upload"} passHref>
                        <Button block>
                            <Important white>다음</Important>
                        </Button>
                    </PlainLink>
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default StoreIn
