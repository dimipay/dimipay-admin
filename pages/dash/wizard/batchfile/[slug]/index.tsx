import { Button, Ul, WizardFrame } from "@/components"
import { Description, Important, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import Link from "next/link"
import { Sidebar } from "pages/dash/partial"
import { ExampleTable } from "./style"

export const BatchFile = () => {
    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center">
                <WizardFrame
                    description="엑셀파일을 업로드해서 데이터를 한번에 수정할 수 있습니다"
                    title="한번에 수정 마법사"
                    gap={3}>
                    <Description color="dark4">
                        상품 이름별 단가를 수정하는 예시 파일
                    </Description>
                    <ExampleTable>
                        <thead>
                            <th>
                                <Vexile paddingy={2} paddingx={4}>
                                    <Description color="dark3">
                                        이름
                                    </Description>
                                </Vexile>
                            </th>
                            <th>
                                <Vexile paddingy={2} paddingx={4}>
                                    <Description color="dark3">
                                        단가
                                    </Description>
                                </Vexile>
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Vexile paddingy={2} paddingx={4}>
                                        <Description color="dark2">
                                            롯데배배로
                                        </Description>
                                    </Vexile>
                                </td>
                                <td>
                                    <Vexile paddingy={2} paddingx={4}>
                                        <Description color="dark2">
                                            3700
                                        </Description>
                                    </Vexile>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Vexile paddingy={2} paddingx={4}>
                                        <Description color="dark2">
                                            계룡산 샘터물
                                        </Description>
                                    </Vexile>
                                </td>
                                <td>
                                    <Vexile paddingy={2} paddingx={4}>
                                        <Description color="dark2">
                                            800
                                        </Description>
                                    </Vexile>
                                </td>
                            </tr>
                        </tbody>
                    </ExampleTable>
                    <Regular>
                        <Ul>
                            <li>
                                엑셀 시트 맨 윗줄에 적혀있는 각 데이터 이름이
                                관리자 페이지에 표시되는 실제 이름과 일치하지
                                않아도 됩니다
                            </li>
                            <li>
                                읽기 전용 값(재고, ID, 내부관리번호)는 변경할 수
                                없습니다
                            </li>
                        </Ul>
                    </Regular>
                    <Link href={location.href + "/upload"}>
                        <Button block>
                            <Important white>다음</Important>
                        </Button>
                    </Link>
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default BatchFile
