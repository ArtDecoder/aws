import {readdirSync, readFileSync, writeFileSync} from 'fs'
import {resolve} from 'path'
import {loadConfig, optimize, OptimizedSvg} from 'svgo'
import {formatWithPrettier} from '@aws/utils'

(async function main(): Promise<void> {
  const srcDir = resolve(__dirname, 'src')
  const outputFile = resolve(__dirname, 'dist', 'icons.ts')
  const svgoConfig = await loadConfig(resolve(__dirname, 'svgo.config.ts'))

  let allSvg = ''

  for (const file of readdirSync(srcDir).filter(file => file.split('.').pop() === 'svg')) {
    const svgStr = readFileSync(resolve(srcDir, file))
    try {
      const {data} = optimize(svgStr, svgoConfig) as OptimizedSvg
      const constName = file.split('.').shift()
      allSvg += `export const ${constName} = '${data}';\n`
    } catch (_) {
      console.error(`error: fail to parse file ${resolve(srcDir, file)}`)
      return
    }
  }

  writeFileSync(outputFile, allSvg)

  formatWithPrettier([outputFile])
})()
