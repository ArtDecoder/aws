import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {inspect} from 'util'
import {GridConfigInterface} from '../grid-config.interface'
import {NameInterface} from '../name.interface'

export function generateBreakpoints(dest: string,
                                    config: GridConfigInterface,
                                    className: NameInterface,
                                    fileName: NameInterface) {
  const a = Object.entries(config.breakPoints)
    .sort((a, b) => {
      return parseInt(a[1].width) > parseInt(b[1].width) ? -1 : 1
    })
    .map((bp, i, arr) => {
      if (i === 0) {
        return [bp[0], {minWidth: parseInt(arr[1][1].width) + 1, maxWidth: +Infinity}]
      } else if (i === arr.length - 1) {
        return [bp[0], {minWidth: 0, maxWidth: parseInt(bp[1].width)}]
      } else {
        return [bp[0], {minWidth: parseInt(arr[i + 1][1].width) + 1, maxWidth: parseInt(bp[1].width)}]
      }
    })

  const o = {}

  for (const [key, value] of a) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    o[key] = value
  }

  const breakpoints = inspect(o)

  const data = `import { ${className.breakpointsType} } from './${fileName.breakpointsType}'\n\n` +
    `export const ${className.breakpoints}: ${className.breakpointsType} = ${breakpoints}`

  writeFileSync(resolve(dest, `${fileName.breakpoints}.ts`), data)
}
