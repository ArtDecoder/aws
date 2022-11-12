export interface StateInterface<Context> {
  on?: {
    [key: string]: {
      target?: string
      actions?: ((context?: Context, payload?: unknown) => void)[]
    }
  }
}
