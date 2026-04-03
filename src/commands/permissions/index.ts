import type { Command } from '../../commands.js'

const permissions = {
  type: 'local-jsx',
  name: 'permissions',
  aliases: ['allowed-tools'],
  description: '허용 및 거부 도구 권한 규칙 관리',
  load: () => import('./permissions.js'),
} satisfies Command

export default permissions
