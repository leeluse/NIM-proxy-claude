/**
 * Copy command - minimal metadata only.
 * Implementation is lazy-loaded from copy.tsx to reduce startup time.
 */
import type { Command } from '../../commands.js'

const copy = {
  type: 'local-jsx',
  name: 'copy',
  description:
    "Claude 의 마지막 응답을 클립보드에 복사 (/copy N 으로 N 번째 최신 응답 복사)",
  load: () => import('./copy.js'),
} satisfies Command

export default copy
