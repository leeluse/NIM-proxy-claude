# 기능 플래그 감사 (Feature Flags Audit)

감사 날짜: 2026-03-31

이 리포지토리는 현재 88개의 `feature('FLAG')` 컴파일 타임 플래그를 참조하고 있습니다.
현재의 외부 빌드 정의 및 외부 모듈 위에 플래그별로 CLI를 한 번씩 번들링하여 다시 확인했습니다. 결과는 다음과 같습니다:

- 54개 플래그: 이 스냅샷에서 깔끔하게 번들링됨
- 34개 플래그: 번들링 실패

중요: "깔끔하게 번들링됨"이 항상 "런타임 시 안전함"을 의미하지는 않습니다. 일부 플래그는 여전히 선택적 네이티브 모듈, claude.ai OAuth, GrowthBook 게이트 또는 외부화된 `@ant/*` 패키지에 의존합니다.

## 빌드 변형 (Build Variants)

- `bun run build`
  `./cli`에 일반 외부 바이너리를 빌드합니다.
- `bun run compile`
  `./dist/cli`에 일반 외부 바이너리를 빌드합니다.
- `bun run build:dev`
  개발용 버전 스탬프와 실험용 GrowthBook 키가 포함된 `./cli-dev`를 빌드합니다.
- `bun run build:dev:full`
  이 문서에 나열된 모든 "작동하는 실험적 기능" 번들이 포함된 `./cli-dev`를 빌드합니다 (단, `CHICAGO_MCP` 제외). `CHICAGO_MCP` 플래그는 컴파일은 되지만, 외부 바이너리 실행 시 누락된 `@ant/computer-use-mcp` 런타임 패키지에 접근하려다 정상적으로 부팅되지 않습니다.

## 기본 빌드 플래그 (Default Build Flags)

- `VOICE_MODE`
  이제 개발 빌드뿐만 아니라 기본 빌드 파이프라인에도 포함됩니다.
  `/voice`, push-to-talk UI, 음성 알림 및 받아쓰기 기반을 활성화합니다.
  런타임은 여전히 claude.ai OAuth와 네이티브 오디오 모듈 또는 SoX와 같은 대체 녹음기(fallback recorder)에 의존합니다.

## 작동하는 실험적 기능 (Working Experimental Features)

이들은 현재 깔끔하게 번들링되는 사용자 대면 또는 동작 변경 플래그입니다. 명시적으로 기본 활성화(default-on)로 언급되지 않는 한, 이 스냅샷에서는 여전히 실험적인 것으로 취급해야 합니다.

### 상호작용 및 UI 실험 (Interaction and UI Experiments)

- `AWAY_SUMMARY`
  REPL에서 자리를 비웠을 때의 요약 동작을 추가합니다.
- `HISTORY_PICKER`
  대화형 프롬프트 기록 선택기를 활성화합니다.
- `HOOK_PROMPTS`
  프롬프트/요청 텍스트를 훅(hook) 실행 흐름으로 전달합니다.
- `KAIROS_BRIEF`
  전체 어시스턴트 스택 없이 요약 전용 트랜스크립트 레이아웃과 BriefTool 지향 UX를 활성화합니다.
- `KAIROS_CHANNELS`
  MCP/채널 메시징 주변의 채널 알림 및 채널 콜백 기반을 활성화합니다.
- `LODESTONE`
  딥 링크 / 프로토콜 등록 관련 흐름 및 설정 배선을 활성화합니다.
- `MESSAGE_ACTIONS`
  대화형 UI에서 메시지 작업 엔트리포인트를 활성화합니다.
- `NEW_INIT`
  새로운 `/init` 결정 경로를 활성화합니다.
- `QUICK_SEARCH`
  프롬프트 빠른 검색 동작을 활성화합니다.
- `SHOT_STATS`
  추가적인 shot 분포 통계 뷰를 활성화합니다.
- `TOKEN_BUDGET`
  토큰 예산 추적, 프롬프트 트리거 및 토큰 경고 UI를 활성화합니다.
- `ULTRAPLAN`
  `/ultraplan`, 프롬프트 트리거 및 종료 계획(exit-plan) 기능을 활성화합니다.
- `ULTRATHINK`
  추가적인 사고 깊이(thinking-depth) 모드 스위치를 활성화합니다.
- `VOICE_MODE`
  음성 전환, 받아쓰기 키바인딩, 음성 알림 및 음성 UI를 활성화합니다.

### 에이전트, 메모리 및 계획 실험 (Agent, Memory, and Planning Experiments)

- `AGENT_MEMORY_SNAPSHOT`
  앱에 추가적인 커스텀 에이전트 메모리 스냅샷 상태를 저장합니다.
- `AGENT_TRIGGERS`
  로컬 크론(cron)/트리거 도구 및 번들링된 트리거 관련 스킬을 활성화합니다.
- `AGENT_TRIGGERS_REMOTE`
  원격 트리거 도구 경로를 활성화합니다.
- `BUILTIN_EXPLORE_PLAN_AGENTS`
  내장된 탐색(explore)/계획(plan) 에이전트 프리셋을 활성화합니다.
- `CACHED_MICROCOMPACT`
  쿼리 및 API 흐름을 통해 캐시된 마이크로 압축(microcompact) 상태를 활성화합니다.
- `COMPACTION_REMINDERS`
  압축 및 첨부 파일 흐름 주변에 알림 문구를 활성화합니다.
- `EXTRACT_MEMORIES`
  쿼리 후 메모리 추출 훅을 활성화합니다.
- `PROMPT_CACHE_BREAK_DETECTION`
  압축/쿼리/API 흐름 주변에서 캐시 중단 감지를 활성화합니다.
- `TEAMMEM`
  팀 메모리 파일, 워처(watcher) 훅 및 관련 UI 메시지를 활성화합니다.
- `VERIFICATION_AGENT`
  프롬프트 및 작업/할 일(todo) 도구에서 검증 에이전트 안내를 활성화합니다.

### 도구, 권한 및 원격 실험 (Tools, Permissions, and Remote Experiments)

- `BASH_CLASSIFIER`
  분류기(classifier) 지원 Bash 권한 결정을 활성화합니다.
- `BRIDGE_MODE`
  원격 제어 / REPL 브리지 명령 및 권한 경로를 활성화합니다.
- `CCR_AUTO_CONNECT`
  CCR 자동 연결 기본 경로를 활성화합니다.
- `CCR_MIRROR`
  아웃바운드 전용 CCR 미러 세션을 활성화합니다.
- `CCR_REMOTE_SETUP`
  원격 설정 명령 경로를 활성화합니다.
- `CHICAGO_MCP`
  컴퓨터 사용(computer-use) MCP 통합 경로 및 래퍼 로딩을 활성화합니다.
- `CONNECTOR_TEXT`
  API/로깅/UI 경로에서 커넥터 텍스트 블록 처리를 활성화합니다.
- `MCP_RICH_OUTPUT`
  더 풍부한 MCP UI 렌더링을 활성화합니다.
- `NATIVE_CLIPBOARD_IMAGE`
  네이티브 macOS 클립보드 이미지 빠른 경로를 활성화합니다.
- `POWERSHELL_AUTO_MODE`
  PowerShell 전용 자동 모드 권한 처리를 활성화합니다.
- `TREE_SITTER_BASH`
  tree-sitter bash 파서 백엔드를 활성화합니다.
- `TREE_SITTER_BASH_SHADOW`
  tree-sitter bash shadow 롤아웃 경로를 활성화합니다.
- `UNATTENDED_RETRY`
  API 재시도 흐름에서 무인 재시도(unattended retry) 동작을 활성화합니다.

## 번들링 가능한 지원 플래그 (Bundle-Clean Support Flags)

이들도 깔끔하게 번들링되지만, 사용자 대면 실험 기능이라기보다는 주로 롤아웃, 플랫폼, 텔레메트리 또는 기반 구조 전환용입니다.

- `ABLATION_BASELINE`
  CLI 제거(ablation)/기준점(baseline) 엔트리포인트 전환입니다.
- `ALLOW_TEST_VERSIONS`
  네이티브 설치 프로그램 흐름에서 테스트 버전을 허용합니다.
- `ANTI_DISTILLATION_CC`
  안티 디스틸레이션(anti-distillation) 요청 메타데이터를 추가합니다.
- `BREAK_CACHE_COMMAND`
  캐시 중단(break-cache) 명령 경로를 주입합니다.
- `COWORKER_TYPE_TELEMETRY`
  동료(coworker) 유형 텔레메트리 필드를 추가합니다.
- `DOWNLOAD_USER_SETTINGS`
  설정 동기화 가져오기(pull) 경로를 활성화합니다.
- `DUMP_SYSTEM_PROMPT`
  시스템 프롬프트 덤프 경로를 활성화합니다.
- `FILE_PERSISTENCE`
  파일 지속성 기반 구조를 활성화합니다.
- `HARD_FAIL`
  더 엄격한 실패/로깅 동작을 활성화합니다.
- `IS_LIBC_GLIBC`
  glibc 환경 감지를 강제합니다.
- `IS_LIBC_MUSL`
  musl 환경 감지를 강제합니다.
- `NATIVE_CLIENT_ATTESTATION`
  시스템 헤더에 네이티브 증명(attestation) 마커 텍스트를 추가합니다.
- `PERFETTO_TRACING`
  perfetto 트레이싱 훅을 활성화합니다.
- `SKILL_IMPROVEMENT`
  스킬 개선 훅을 활성화합니다.
- `SKIP_DETECTION_WHEN_AUTOUPDATES_DISABLED`
  자동 업데이트가 비활성화된 경우 업데이트 감지를 건너뜁니다.
- `SLOW_OPERATION_LOGGING`
  느린 작업 로깅을 활성화합니다.
- `UPLOAD_USER_SETTINGS`
  설정 동기화 푸시(push) 경로를 활성화합니다.

## 컴파일은 되지만 런타임 주의사항이 있는 플래그

현재 번들링은 되지만, 의미 있는 런타임 주의사항이 있어 여전히 실험적인 것으로 취급합니다.

- `VOICE_MODE`
  깔끔하게 번들링되지만 claude.ai OAuth와 로컬 녹음 백엔드가 필요합니다. 네이티브 오디오 모듈은 이제 선택 사항입니다. 이 머신에서는 대체 경로로 `brew install sox`를 요구합니다.
- `NATIVE_CLIPBOARD_IMAGE`
  깔끔하게 번들링되지만 `image-processor-napi`가 있을 때만 macOS 클립보드 읽기를 가속화합니다.
- `BRIDGE_MODE`, `CCR_AUTO_CONNECT`, `CCR_MIRROR`, `CCR_REMOTE_SETUP`
  깔끔하게 번들링되지만 런타임 시 claude.ai OAuth 및 GrowthBook 권한 확인에 의해 제한됩니다.
- `KAIROS_BRIEF`, `KAIROS_CHANNELS`
  깔끔하게 번들링되지만 누락된 전체 어시스턴트 스택을 복구하지는 않습니다. 여전히 존재하는 요약/채널 관련 인터페이스만 노출합니다.
- `CHICAGO_MCP`
  깔끔하게 번들링되지만 런타임 경로가 여전히 외부화된 `@ant/computer-use-*` 패키지에 도달합니다. 외부 스냅샷에서 컴파일은 안전하지만 런타임은 완전히 안전하지 않습니다.
- `TEAMMEM`
  깔끔하게 번들링되지만 환경에서 팀 메모리 설정/파일이 실제로 활성화된 경우에만 유용한 작업을 수행합니다.

## 쉬운 복구 경로가 있는 고장난 플래그

현재 차단 요소가 충분히 작아서, 전체 서브시스템을 재구축하지 않고도 집중적인 복구 작업을 통해 복원할 수 있을 것으로 보이는 플래그들입니다.

- `AUTO_THEME`
  `src/utils/systemThemeWatcher.js` 누락으로 실패. `systemTheme.ts`와 테마 제공자에 이미 캐시/파싱 로직이 있으므로, 누락된 조각은 OSC 11 워처뿐인 것으로 보입니다.
- `BG_SESSIONS`
  `src/cli/bg.js` 누락으로 실패. `src/entrypoints/cli.tsx`의 CLI 빠른 경로 디스패치는 이미 연결되어 있습니다.
- `BUDDY`
  `src/commands/buddy/index.js` 누락으로 실패. 버디(buddy) UI 컴포넌트와 프롬프트 입력 훅은 이미 존재합니다.
- `BUILDING_CLAUDE_APPS`
  `src/claude-api/csharp/claude-api.md` 누락으로 실패. 이것은 런타임 서브시스템 누락이 아니라 에셋/문서의 공백으로 보입니다.
- `COMMIT_ATTRIBUTION`
  `src/utils/attributionHooks.js` 누락으로 실패. 설정 및 캐시 삭제 코드는 이미 해당 훅 모듈을 호출하고 있습니다.
- `FORK_SUBAGENT`
  `src/commands/fork/index.js` 누락으로 실패. 명령 슬롯과 메시지 렌더링 지원은 이미 제공됩니다.
- `HISTORY_SNIP`
  `src/commands/force-snip.js` 누락으로 실패. 주변의 SnipTool과 쿼리/메시지 주석은 이미 존재합니다.
- `KAIROS_GITHUB_WEBHOOKS`
  `src/tools/SubscribePRTool/SubscribePRTool.js` 누락으로 실패. 명령 슬롯과 일부 메시지 처리는 이미 존재합니다.
- `KAIROS_PUSH_NOTIFICATION`
  `src/tools/PushNotificationTool/PushNotificationTool.js` 누락으로 실패. 도구 슬롯은 이미 `src/tools.ts`에 존재합니다.
- `MCP_SKILLS`
  `src/skills/mcpSkills.js` 누락으로 실패. `mcpSkillBuilders.ts`는 이미 해당 누락된 레지스트리 레이어를 지원하기 위해 존재합니다.
- `MEMORY_SHAPE_TELEMETRY`
  `src/memdir/memoryShapeTelemetry.js` 누락으로 실패. 훅 호출 지점은 이미 `sessionFileAccessHooks.ts`에 마련되어 있습니다.
- `OVERFLOW_TEST_TOOL`
  `src/tools/OverflowTestTool/OverflowTestTool.js` 누락으로 실패. 고립되어 있으며 테스트 전용으로 보입니다.
- `RUN_SKILL_GENERATOR`
  `src/runSkillGenerator.js` 누락으로 실패. 번들링된 스킬 등록 경로에서 이미 이를 예상하고 있습니다.
- `TEMPLATES`
  `src/cli/handlers/templateJobs.js` 누락으로 실패. CLI 빠른 경로가 이미 `src/entrypoints/cli.tsx`에 연결되어 있습니다.
- `TORCH`
  `src/commands/torch.js` 누락으로 실패. 단일 명령 포트 누락으로 보입니다.
- `TRANSCRIPT_CLASSIFIER`
  첫 번째 하드 실패는 `src/utils/permissions/yolo-classifier-prompts/auto_mode_system_prompt.txt` 누락입니다. 분류기 엔진, 파서 및 설정 배선은 이미 존재하므로, 누락된 프롬프트/에셋이 첫 번째 복구 대상이 될 것입니다.

## 일부 배선은 되어 있지만 중간 규모의 공백이 있는 고장난 플래그

주변 코드는 어느 정도 존재하지만, 누락된 부분이 단일 래퍼나 에셋보다 큰 경우입니다.

- `BYOC_ENVIRONMENT_RUNNER`: `src/environment-runner/main.js` 누락
- `CONTEXT_COLLAPSE`: `src/tools/CtxInspectTool/CtxInspectTool.js` 누락
- `COORDINATOR_MODE`: `src/coordinator/workerAgent.js` 누락
- `DAEMON`: `src/daemon/workerRegistry.js` 누락
- `DIRECT_CONNECT`: `src/server/parseConnectUrl.js` 누락
- `EXPERIMENTAL_SKILL_SEARCH`: `src/services/skillSearch/localSearch.js` 누락
- `MONITOR_TOOL`: `src/tools/MonitorTool/MonitorTool.js` 누락
- `REACTIVE_COMPACT`: `src/services/compact/reactiveCompact.js` 누락
- `REVIEW_ARTIFACT`: `src/hunter.js` 누락
- `SELF_HOSTED_RUNNER`: `src/self-hosted-runner/main.js` 누락
- `SSH_REMOTE`: `src/ssh/createSSHSession.js` 누락
- `TERMINAL_PANEL`: `src/tools/TerminalCaptureTool/TerminalCaptureTool.js` 누락
- `UDS_INBOX`: `src/utils/udsMessaging.js` 누락
- `WEB_BROWSER_TOOL`: `src/tools/WebBrowserTool/WebBrowserTool.js` 누락
- `WORKFLOW_SCRIPTS`: `src/commands/workflows/index.js`에서 먼저 실패하지만 더 많은 공백이 있습니다. `tasks.ts`는 이미 `LocalWorkflowTask`를 예상하고 있고, `tools.ts`는 이 스냅샷에 `WorkflowTool/constants.ts`만 존재함에도 불구하고 실제 `WorkflowTool` 구현을 예상하고 있습니다.

## 대규모 서브시스템이 누락된 고장난 플래그

첫 번째 누락된 임포트가 더 광범위하게 부재한 서브시스템의 가시적인 끝자락일 뿐이라서 복구 비용이 많이 들 것으로 보이는 경우입니다.

- `KAIROS`: `src/assistant/index.js` 및 대부분의 어시스턴트 스택 누락
- `KAIROS_DREAM`: `src/dream.js` 및 관련 dream-task 동작 누락
- `PROACTIVE`: `src/proactive/index.js` 및 proactive 작업/도구 스택 누락

## 유용한 진입점 (Entry Points)

- 기능 인식 빌드 로직: [scripts/build.ts](scripts/build.ts)
- 기능 제한 명령 임포트: [src/commands.ts](src/commands.ts)
- 기능 제한 도구 임포트: [src/tools.ts](src/tools.ts)
- 기능 제한 작업 임포트: [src/tasks.ts](src/tasks.ts)
- 기능 제한 쿼리 동작: [src/query.ts](src/query.ts)
- 기능 제한 CLI 진입 경로: [src/entrypoints/cli.tsx](src/entrypoints/cli.tsx)
