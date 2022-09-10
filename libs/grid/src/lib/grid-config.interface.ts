export interface GridConfigInterface {
  filename: string
  outputStyle: string
  columns: number
  offset: string
  mobileFirst: boolean
  container: {
    maxWidth: string
    fields: string
  },
  breakPoints: {
    [key: string]: {
      width: string,
      fields?: string
    }
  }
}
