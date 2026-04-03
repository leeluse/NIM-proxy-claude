import type { Command } from '../../commands.js'

const status = {
  type: 'local-jsx',
  name: 'status',
  description:
    'Claude Code 상태 표시 (버전, 모델, 계정, API 연결 상태, 도구 상태)',
  immediate: true,
  load: () => import('./status.js'),
} satisfies Command

export default status
