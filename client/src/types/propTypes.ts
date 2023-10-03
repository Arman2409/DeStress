export type JestProps = {
    keyClicked?: boolean
    borderRight?: boolean
    borderLeft?: boolean
    jestImg: string
    keyboardImg: string
    name: string
    onClick: Function
}

export type ShakingHandProps = {
    jest:string
    initialJest: string
    side: "left"|"right"
    duration: number
}