import type { Command } from '../../commands.js'

const stats = {
  type: 'local-jsx',
  name: 'stats',
  description: 'Claude Code 사용 통계 및 활동 표시',
  load: () => import('./stats.js'),
} satisfies Command

export default stats
