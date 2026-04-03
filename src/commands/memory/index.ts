import type { Command } from '../../commands.js'

const memory: Command = {
  type: 'local-jsx',
  name: 'memory',
  description: 'Claude 메모리 파일 편집',
  load: () => import('./memory.js'),
}

export default memory
