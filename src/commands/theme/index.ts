import type { Command } from '../../commands.js'

const theme = {
  type: 'local-jsx',
  name: 'theme',
  description: '테마 변경',
  load: () => import('./theme.js'),
} satisfies Command

export default theme
