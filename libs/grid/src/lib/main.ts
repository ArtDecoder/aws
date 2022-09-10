// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {resolve} from 'path'
// @ts-ignore
import * as smartGrid from 'smart-grid'
import {formatWithPrettier} from '../../../utils/src/lib/prittier-format/format-with-prettier'
import {gridConfig} from './grid-config'
import {NameInterface} from './name.interface'
import {generateBreakpoints} from './scripts/generate-breakpoints'
import {generateBreakpointsType} from './scripts/generate-breakpoints-type'
import {generateEnum} from './scripts/generate-enum'
import {generateIndex} from './scripts/generate-index'
import {resetOutputDir} from './scripts/reset-outdir'

const outputDir = resolve(__dirname, 'dist')

const className: NameInterface = {
  breakpointsType: 'BreakpointsType',
  enum: 'BreakpointEnum',
  breakpoints: 'Breakpoints',
}

const fileName: NameInterface = {
  breakpointsType: 'breakpoint.type',
  enum: 'breakpoint.enum',
  breakpoints: 'breakpoints',
}

resetOutputDir(outputDir)
generateEnum(outputDir, gridConfig, className, fileName)
generateBreakpointsType(outputDir, className, fileName)
generateBreakpoints(outputDir, gridConfig, className, fileName)
generateIndex(outputDir, fileName)

formatWithPrettier([
  resolve(outputDir, `${fileName.enum}.ts`),
  resolve(outputDir, `${fileName.breakpoints}.ts`),
  resolve(outputDir, 'index.ts'),
])

smartGrid(outputDir, gridConfig)
