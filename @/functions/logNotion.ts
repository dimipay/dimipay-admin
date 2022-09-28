import { NOTION_TABLE, NOTION_TOKEN } from "@/constants"
import axios from "axios"

export const logNotion = async (props: {
    actioner: string
    type: string
    url: string
    data: any
    result: any
}) => {
    const result = JSON.stringify(props.result)?.slice(0, 2000)

    try {
        await axios("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_TOKEN}`,
                "Notion-Version": "2022-02-22",
            },
            data: {
                parent: {
                    database_id: NOTION_TABLE,
                },
                properties: {
                    행위자: {
                        select: {
                            name: props.actioner,
                        },
                    },
                    유형: {
                        select: {
                            name: props.type,
                        },
                    },
                    주소: {
                        rich_text: [
                            {
                                text: {
                                    content: JSON.stringify(props.url)?.slice(
                                        0,
                                        2000,
                                    ),
                                },
                            },
                        ],
                    },
                    내용: {
                        rich_text: [
                            {
                                text: {
                                    content: JSON.stringify(props.data)?.slice(
                                        0,
                                        2000,
                                    ),
                                },
                            },
                        ],
                    },
                    결과: {
                        rich_text: [
                            {
                                text: {
                                    content: result.includes("eyJ")
                                        ? "BLIND"
                                        : result,
                                },
                            },
                        ],
                    },
                    환경: {
                        select: {
                            name: process.env.NODE_ENV,
                        },
                    },
                },
            },
        })
    } catch (e) {
        console.error(e)
    }
}
