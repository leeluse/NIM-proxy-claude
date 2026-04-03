import type { Command } from '../../commands.js'

const agents = {
  type: 'local-jsx',
  name: 'agents',
  description: '에이전트 설정 관리',
  load: () => import('./agents.js'),
} satisfies Command

export default agents
