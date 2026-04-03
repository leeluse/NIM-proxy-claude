import type { Command } from '../../commands.js'

const ide = {
  type: 'local-jsx',
  name: 'ide',
  description: 'IDE 통합 관리 및 상태 표시',
  argumentHint: '[open]',
  load: () => import('./ide.js'),
} satisfies Command

export default ide
