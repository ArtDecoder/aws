import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {GridConfigInterface} from '../interfaces/grid-config.interface'
import {NameInterface} from '../interfaces/name.interface'

export function generateEnum(dest: string,
                             config: GridConfigInterface,
                             className: NameInterface,
                             fileName: NameInterface) {
  let breakpoints = ''
  for (const key of Object.keys(config.breakPoints)) {
    breakpoints = `${breakpoints}  ${key} = '${key}',\n`
  }

  const data = `export enum ${className.enum} {` +
    `${breakpoints}` +
    `}`

  writeFileSync(resolve(dest, `${fileName.enum}.ts`), data)
}
