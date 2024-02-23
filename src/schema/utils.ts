import { Dispatch, SetStateAction } from "react"

// export type SetState<T> = Dispatch<SetStateAction<T>>
export type SetState<T> = (v: T) => void
