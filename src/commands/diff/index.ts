import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'diff',
  description: '커밋되지 않은 변경사항 및 턴별 diff 확인',
  load: () => import('./diff.js'),
} satisfies Command
