import type { Command } from '../../commands.js'

const command = {
  name: 'vim',
  description: 'Vim 모드와 일반 편집 모드 간 전환',
  supportsNonInteractive: false,
  type: 'local',
  load: () => import('./vim.js'),
} satisfies Command

export default command
