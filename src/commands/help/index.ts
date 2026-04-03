import type { Command } from '../../commands.js'

const help = {
  type: 'local-jsx',
  name: 'help',
  description: '도움말 및 사용 가능한 명령어 표시',
  load: () => import('./help.js'),
} satisfies Command

export default help
