import {readFileSync, writeFileSync} from 'fs'
import {format, resolveConfig} from 'prettier'

export function formatWithPrettier(files: string[], prettierConfig?: string): void {
  for (const file of files) {
    const fileBody = readFileSync(file, 'utf8')
    const options = resolveConfig.sync(prettierConfig ?? 'prettier.config.js')

    const formatted = format(fileBody, {...options, parser: 'typescript'})

    writeFileSync(file, formatted)
  }
}
