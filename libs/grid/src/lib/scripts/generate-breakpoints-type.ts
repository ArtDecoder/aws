import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {NameInterface} from '../interfaces/name.interface'

export function generateBreakpointsType(dest: string,
                                        className: NameInterface,
                                        fileName: NameInterface) {
  const data = `import { ${className.enum} } from './${fileName.enum}'\n\n` +
    `export type ${className.breakpointsType} = {` +
    `[key in keyof typeof ${className.enum}]: {minWidth: number, maxWidth: number}\n` +
    `}`

  writeFileSync(resolve(dest, `${fileName.breakpointsType}.ts`), data)
}
