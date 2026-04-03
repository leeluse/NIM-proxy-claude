import type { Command } from '../../commands.js'

const skills = {
  type: 'local-jsx',
  name: 'skills',
  description: '사용 가능한 스킬 나열',
  load: () => import('./skills.js'),
} satisfies Command

export default skills
