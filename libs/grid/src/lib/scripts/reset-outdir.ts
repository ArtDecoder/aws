import {existsSync, mkdirSync, readdirSync, unlinkSync} from 'fs'
import {join} from 'path'

export function resetOutputDir(dest: string) {
  if (!existsSync(dest)) {
    mkdirSync(dest, {recursive: true})
  } else {
    const files = readdirSync(dest)

    for (const file of files) {
      unlinkSync(join(dest, file))
    }
  }
}
