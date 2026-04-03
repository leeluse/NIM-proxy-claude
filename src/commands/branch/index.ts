import { feature } from 'bun:bundle'
import type { Command } from '../../commands.js'

const branch = {
  type: 'local-jsx',
  name: 'branch',
  // 'fork' alias only when /fork doesn't exist as its own command
  aliases: feature('FORK_SUBAGENT') ? [] : ['fork'],
  description: '현재 대화의 브랜치 생성',
  argumentHint: '[name]',
  load: () => import('./branch.js'),
} satisfies Command

export default branch
