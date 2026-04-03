import type { Command } from '../../commands.js'

const hooks = {
  type: 'local-jsx',
  name: 'hooks',
  description: '도구 이벤트용 후크 설정 확인',
  immediate: true,
  load: () => import('./hooks.js'),
} satisfies Command

export default hooks
