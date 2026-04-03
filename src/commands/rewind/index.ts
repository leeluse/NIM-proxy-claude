import type { Command } from '../../commands.js'

const rewind = {
  description: '코드 및/또는 대화를 이전 시점으로 복원',
  name: 'rewind',
  aliases: ['checkpoint'],
  argumentHint: '',
  type: 'local',
  supportsNonInteractive: false,
  load: () => import('./rewind.js'),
} satisfies Command

export default rewind
