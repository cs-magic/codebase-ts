export type IClient = {
  onEvent: (event: string) => Promise<void>
}
export type IRequest = { data: string; finished: boolean; clients: IClient[] }
