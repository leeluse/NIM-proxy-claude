import type { Command } from '../../commands.js'

const config = {
  aliases: ['settings'],
  type: 'local-jsx',
  name: 'config',
  description: '설정 패널 열기',
  load: () => import('./config.js'),
} satisfies Command

export default config
