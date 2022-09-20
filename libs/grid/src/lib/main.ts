import {formatWithPrettier} from '@aws/utils'
import {resolve} from 'path'
import smartGrid from 'smart-grid'
import {gridConfig} from './grid-config'
import {NameInterface} from './interfaces/name.interface'
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
