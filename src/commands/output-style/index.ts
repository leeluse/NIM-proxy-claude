import type { Command } from '../../commands.js'

const outputStyle = {
  type: 'local-jsx',
  name: 'output-style',
  description: '사용 안함: /output-style 대신 /config 사용',
  isHidden: true,
  load: () => import('./output-style.js'),
} satisfies Command

export default outputStyle
