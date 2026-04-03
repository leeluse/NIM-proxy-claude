import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'usage',
  description: '플랜 사용 한도 표시',
  availability: ['claude-ai'],
  load: () => import('./usage.js'),
} satisfies Command
