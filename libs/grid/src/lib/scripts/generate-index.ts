import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {NameInterface} from '../name.interface'

export function generateIndex(dest: string, fileNames: NameInterface) {

  let data = ''

  for (const file of Object.entries(fileNames)) {
    data += `export * from './${file[1]}'\n`
  }

  writeFileSync(resolve(dest, 'index.ts'), data)
}
