import type { Command } from '../../commands.js'

const mobile = {
  type: 'local-jsx',
  name: 'mobile',
  aliases: ['ios', 'android'],
  description: 'Claude 모바일 앱 다운로드용 QR 코드 표시',
  load: () => import('./mobile.js'),
} satisfies Command

export default mobile
