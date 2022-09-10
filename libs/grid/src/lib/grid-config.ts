import {GridConfigInterface} from './grid-config.interface'

export const gridConfig: GridConfigInterface = {
  filename: '_smart-grid',
  outputStyle: 'scss',
  columns: 12,
  offset: '2rem',
  mobileFirst: false,
  container: {
    maxWidth: '1200px',
    fields: '1rem',
  },
  breakPoints: {
    lg: {
      width: '1200px',
    },
    md: {
      width: '992px',
    },
    sm: {
      width: '720px',
    },
    xs: {
      width: '576px',
    },
  },
}
