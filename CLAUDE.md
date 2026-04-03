# CLAUDE.md

이 파일은 이 리포지토리에서 작업할 때 Claude Code(claude.ai/code)에게 안내를 제공합니다.

## 일반적인 명령

```bash
# 종속성 설치
bun install

# 표준 빌드 (./cli)
bun run build

# 개발 빌드 (./cli-dev)
bun run build:dev

# 모든 실험적 기능이 포함된 개발 빌드 (./cli-dev)
bun run build:dev:full

# 컴파일된 빌드 (./dist/cli)
bun run compile

# 컴파일 없이 소스에서 실행
bun run dev
```

빌드된 바이너리를 `./cli` 또는 `./cli-dev`로 실행합니다. 환경 변수에 `ANTHROPIC_API_KEY`를 설정하거나 `./cli /login`을 통해 OAuth를 사용하세요.

## 상위 레벨 아키텍처

- **진입점/UI 루프**: src/entrypoints/cli.tsx가 CLI를 부트스트랩하며, 기본 대화형 UI는 src/screens/REPL.tsx (Ink/React)에 있습니다.
- **명령/도구 레지스트리**: src/commands.ts는 슬래시(/) 명령을 등록하고, src/tools.ts는 도구 구현체를 등록합니다. 구현체는 src/commands/ 및 src/tools/에 위치합니다.
- **LLM 쿼리 파이프라인**: src/QueryEngine.ts는 메시지 흐름, 도구 사용 및 모델 호출을 조정합니다.
- **핵심 서브시스템**:
  - src/services/: API 클라이언트, OAuth/MCP 통합, 분석 스텁
  - src/state/: 앱 상태 저장소
  - src/hooks/: UI/흐름에서 사용되는 React 훅
  - src/components/: 터미널 UI 컴포넌트 (Ink)
  - src/skills/: 스킬 시스템
  - src/plugins/: 플러그인 시스템
  - src/bridge/: IDE 브리지
  - src/voice/: 음성 입력
  - src/tasks/: 백그라운드 작업 관리

## 빌드 시스템

- scripts/build.ts는 빌드 스크립트이자 기능 플래그 번들러입니다. 기능 플래그는 빌드 인수(예: `--feature=ULTRAPLAN`) 또는 `--feature-set=dev-full`과 같은 프리셋을 통해 설정할 수 있습니다(자세한 내용은 README 참조).
