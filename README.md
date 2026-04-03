
<p align="center">
  <img src="assets/screenshot.png" alt="free-code" width="720" />
</p>

<h1 align="center">free-code</h1>

<p align="center">
  <strong>Claude Code의 자유로운 빌드 버전.</strong><br>
  모든 텔레메트리 제거. 모든 가드레일 해제. 모든 실험적 기능 잠금 해제.<br>
  단일 바이너리, 외부 콜백 없음.
</p>

<p align="center">
  <a href="#빠른-설치"><img src="https://img.shields.io/badge/install-one--liner-blue?style=flat-square" alt="Install" /></a>
  <a href="https://github.com/paoloanzn/free-code/stargazers"><img src="https://img.shields.io/github/stars/paoloanzn/free-code?style=flat-square" alt="Stars" /></a>
  <a href="https://github.com/paoloanzn/free-code/issues"><img src="https://img.shields.io/github/issues/paoloanzn/free-code?style=flat-square" alt="Issues" /></a>
  <a href="https://github.com/paoloanzn/free-code/blob/main/FEATURES.md"><img src="https://img.shields.io/badge/features-88%20flags-orange?style=flat-square" alt="Feature Flags" /></a>
  <a href="#ipfs-미러"><img src="https://img.shields.io/badge/IPFS-mirrored-teal?style=flat-square" alt="IPFS" /></a>
</p>

---

## 빠른 설치

```bash
curl -fsSL https://raw.githubusercontent.com/paoloanzn/free-code/main/install.sh | bash
```

시스템을 확인하고, 필요한 경우 Bun을 설치하며, 리포지토리를 복제하고, 모든 실험적 기능을 활성화하여 빌드한 후 PATH에 `free-code` 심볼릭 링크를 생성합니다.

그 다음 `free-code`를 실행하고 `/login` 명령을 사용하여 선호하는 모델 제공자로 인증하세요.

---

## 목차

- [이것은 무엇인가요?](#이것은-무엇인가요)
- [모델 제공자](#모델-제공자)
- [빠른 설치](#빠른-설치)
- [요구 사항](#요구-사항)
- [빌드](#빌드)
- [사용법](#사용법)
- [실험적 기능](#실험적-기능)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [IPFS 미러](#ipfs-미러)
- [기여하기](#기여하기)
- [라이선스](#라이선스)

---

## 이것은 무엇인가요?

Anthropic의 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI(터미널 기반 AI 코딩 에이전트)를 깨끗하고 빌드 가능한 형태로 포크한 프로젝트입니다. 업스트림 소스는 2026년 3월 31일 npm 배포 과정에서 소스 맵이 노출되면서 공개적으로 사용 가능해졌습니다.

이 포크 버전은 해당 스냅샷 위에 세 가지 카테고리의 변경 사항을 적용합니다:

### 텔레메트리 제거

업스트림 바이너리는 OpenTelemetry/gRPC, GrowthBook 분석, Sentry 오류 보고, 사용자 정의 이벤트 로깅을 통해 외부로 데이터를 전송합니다. 이 빌드에서는 다음이 적용됩니다:

- 모든 외부 텔레메트리 엔드포인트는 Dead-code elimination 처리되거나 스텁(stub)으로 대체되었습니다.
- GrowthBook 기능 플래그 평가는 여전히 로컬에서 작동하지만(런타임 기능 제어에 필요), 외부로 보고하지 않습니다.
- 충돌 보고, 사용 분석, 세션 지문 채취(fingerprinting)가 없습니다.

### 보안 프롬프트 가드레일 제거

Anthropic은 모델 자체가 강제하는 것 이상으로 Claude의 행동을 제한하는 시스템 수준 지침을 모든 대화에 삽입합니다. 여기에는 하드코딩된 거부 패턴, 주입된 '사이버 위험' 지침 블록, Anthropic 서버에서 푸시되는 관리형 보안 설정 레이어 등이 포함됩니다.

이 빌드는 이러한 주입된 지침들을 제거합니다. 모델 자체의 안전 훈련(safety training)은 여전히 적용되지만, CLI가 모델을 둘러싸고 있는 프롬프트 수준의 추가 제한 레이어만 제거한 것입니다.

### 실험적 기능 잠금 해제

Claude Code는 `bun:bundle` 컴파일 타임 스위치 뒤에 숨겨진 88개의 기능 플래그와 함께 제공됩니다. 공식 npm 릴리스에서는 대부분 비활성화되어 있습니다. 이 빌드는 깔끔하게 컴파일되는 54개의 플래그를 모두 잠금 해제합니다. 아래의 [실험적 기능](#실험적-기능) 섹션을 확인하거나, 전체 감사 내용은 [FEATURES.md](FEATURES.md)를 참조하세요.

---

## 모델 제공자

free-code는 기본적으로 **5개의 API 제공자**를 지원합니다. 해당 환경 변수를 설정하여 제공자를 전환할 수 있으며, 코드 변경은 필요하지 않습니다.

### Anthropic (Direct API) -- 기본값

Anthropic의 자사 API를 직접 사용합니다.

| 모델 | ID |
|---|---|
| Claude Opus 4.6 | `claude-opus-4-6` |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Haiku 4.5 | `claude-haiku-4-5` |

### OpenAI Codex

코드 생성을 위해 OpenAI의 Codex 모델을 사용합니다. Codex 구독이 필요합니다.

| 모델 | ID |
|---|---|
| GPT-5.3 Codex (권장) | `gpt-5.3-codex` |
| GPT-5.4 | `gpt-5.4` |
| GPT-5.4 Mini | `gpt-5.4-mini` |

```bash
export CLAUDE_CODE_USE_OPENAI=1
free-code
```

### AWS Bedrock

Amazon Bedrock을 통해 AWS 계정으로 요청을 라우팅합니다.

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION="us-east-1"   # 또는 AWS_DEFAULT_REGION
free-code
```

표준 AWS 자격 증명(환경 변수, `~/.aws/config`, 또는 IAM 역할)을 사용합니다. 모델은 자동으로 Bedrock ARN 형식으로 매핑됩니다(예: `us.anthropic.claude-opus-4-6-v1`).

| 변수 | 용도 |
|---|---|
| `CLAUDE_CODE_USE_BEDROCK` | Bedrock 제공자 활성화 |
| `AWS_REGION` / `AWS_DEFAULT_REGION` | AWS 지역 (기본값: `us-east-1`) |
| `ANTHROPIC_BEDROCK_BASE_URL` | 사용자 정의 Bedrock 엔드포인트 |
| `AWS_BEARER_TOKEN_BEDROCK` | Bearer 토큰 인증 |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | 인증 건너뛰기 (테스트용) |

### Google Cloud Vertex AI

Vertex AI를 통해 GCP 프로젝트로 요청을 라우팅합니다.

```bash
export CLAUDE_CODE_USE_VERTEX=1
free-code
```

Google Cloud 애플리케이션 기본 자격 증명(`gcloud auth application-default login`)을 사용합니다. 모델은 자동으로 Vertex 형식으로 매핑됩니다(예: `claude-opus-4-6@latest`).

### Anthropic Foundry

전용 배포를 위해 Anthropic Foundry를 사용합니다.

```bash
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_API_KEY="..."
free-code
```

사용자 정의 배포 ID를 모델 이름으로 지원합니다.

### NVIDIA NIM (via LiteLLM) -- 강력 추천

NVIDIA NIM을 LiteLLM 프록시와 연동하여 오픈 소어 모델(Qwen, GLM 등)을 Claude Code에서 사용할 수 있습니다.

1. 프록시 서버 실행 (상위 폴더의 `nim` 도구 사용)
2. `.env` 파일 설정:
```env
ANTHROPIC_BASE_URL="http://localhost:4000"
ANTHROPIC_API_KEY="sk-litellm-local"
ANTHROPIC_MODEL="claude-sonnet-4-6"
```

위 설정을 완료하면 별도의 인자 없이 `./cli.exe` 실행만으로 NIM 모델을 사용할 수 있습니다.

### 제공자 선택 요약

| 제공자 | 환경 변수 | 인증 방법 |
|---|---|---|
| Anthropic (기본값) | -- | `ANTHROPIC_API_KEY` 또는 OAuth |
| OpenAI Codex | `CLAUDE_CODE_USE_OPENAI=1` | OpenAI를 통한 OAuth |
| AWS Bedrock | `CLAUDE_CODE_USE_BEDROCK=1` | AWS 자격 증명 |
| Google Vertex AI | `CLAUDE_CODE_USE_VERTEX=1` | `gcloud` ADC |
| Anthropic Foundry | `CLAUDE_CODE_USE_FOUNDRY=1` | `ANTHROPIC_FOUNDRY_API_KEY` |

---

## 요구 사항

- **런타임**: [Bun](https://bun.sh) >= 1.3.11
- **OS**: macOS 또는 Linux (Windows는 WSL 필요)
- **인증**: 선택한 제공자의 API 키 또는 OAuth 로그인

```bash
# Bun이 설치되어 있지 않은 경우 설치
curl -fsSL https://bun.sh/install | bash
```

---

## 빌드

```bash
git clone https://github.com/paoloanzn/free-code.git
cd free-code
bun build
./cli
```

### 빌드 변형

| 명령 | 출력 | 기능 | 설명 |
|---|---|---|---|
| `bun run build` | `./cli` | `VOICE_MODE` 전용 | 운영 환경용 바이너리 |
| `bun run build:dev` | `./cli-dev` | `VOICE_MODE` 전용 | 개발 버전 스탬프 |
| `bun run build:dev:full` | `./cli-dev` | 54개 실험용 플래그 전체 | 전체 잠금 해제 빌드 |
| `bun run compile` | `./dist/cli` | `VOICE_MODE` 전용 | 대체 출력 경로 |

### 사용자 정의 기능 플래그

전체 번들 없이 특정 플래그만 활성화:

```bash
# ultraplan과 ultrathink만 활성화
bun run ./scripts/build.ts --feature=ULTRAPLAN --feature=ULTRATHINK

# 개발 빌드 위에 플래그 추가
bun run ./scripts/build.ts --dev --feature=BRIDGE_MODE
```

---

## 사용법

```bash
# 대화형 REPL (기본값)
./cli

# 일회성(One-shot) 모드
./cli -p "이 디렉토리에 어떤 파일들이 있나요?"

# 모델 지정
./cli --model claude-opus-4-6

# 소스에서 직접 실행 (시작 속도 느림)
bun run dev

# OAuth 로그인
./cli /login
```

### 환경 변수 참조

| 변수 | 용도 |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API 키 |
| `ANTHROPIC_AUTH_TOKEN` | 인증 토큰 (대안) |
| `ANTHROPIC_MODEL` | 기본 모델 재정의 |
| `ANTHROPIC_BASE_URL` | 사용자 정의 API 엔드포인트 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | 사용자 정의 Opus 모델 ID |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | 사용자 정의 Sonnet 모델 ID |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 사용자 정의 Haiku 모델 ID |
| `CLAUDE_CODE_OAUTH_TOKEN` | 환경 변수를 통한 OAuth 토큰 |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | API 키 헬퍼 캐시 TTL |

---

## 실험적 기능

`bun run build:dev:full` 빌드는 작동하는 54개의 기능 플래그를 모두 활성화합니다. 주요 기능:

### 상호작용 및 UI

| 플래그 | 설명 |
|---|---|
| `ULTRAPLAN` | Claude Code 웹에서 원격 멀티 에이전트 계획 수립 (Opus급) |
| `ULTRATHINK` | 심층 사고 모드 -- "ultrathink"를 입력하여 추론 능력 강화 |
| `VOICE_MODE` | Push-to-talk 음성 입력 및 받아쓰기 |
| `TOKEN_BUDGET` | 토큰 예산 추적 및 사용 경고 |
| `HISTORY_PICKER` | 대화형 프롬프트 기록 선택기 |
| `MESSAGE_ACTIONS` | UI의 메시지 작업 엔트리포인트 |
| `QUICK_SEARCH` | 프롬프트 빠른 검색 |
| `SHOT_STATS` | Shot 분포 통계 |

### 에이전트, 메모리 및 계획

| 플래그 | 설명 |
|---|---|
| `BUILTIN_EXPLORE_PLAN_AGENTS` | 내장 탐색/계획 에이전트 프리셋 |
| `VERIFICATION_AGENT` | 작업 검증을 위한 검증 에이전트 |
| `AGENT_TRIGGERS` | 백그라운드 자동화를 위한 로컬 크론/트리거 도구 |
| `AGENT_TRIGGERS_REMOTE` | 원격 트리거 도구 경로 |
| `EXTRACT_MEMORIES` | 쿼리 후 자동 메모리 추출 |
| `COMPACTION_REMINDERS` | 컨텍스트 압축 관련 스마트 알림 |
| `CACHED_MICROCOMPACT` | 쿼리 흐름을 통한 캐시된 마이크로 압축 상태 |
| `TEAMMEM` | 팀 메모리 파일 및 워처(watcher) 훅 |

### 도구 및 인프라

| 플래그 | 설명 |
|---|---|
| `BRIDGE_MODE` | IDE 원격 제어 브리지 (VS Code, JetBrains) |
| `BASH_CLASSIFIER` | 분류기 지원 Bash 권한 결정 |
| `PROMPT_CACHE_BREAK_DETECTION` | 압축/쿼리 흐름의 캐시 중단 감지 |

전체 88개 플래그(재구성 노트가 포함된 34개의 고장난 플래그 포함)에 대한 감사는 [FEATURES.md](FEATURES.md)를 참조하세요.

---

## 프로젝트 구조

```
scripts/
  build.ts                # 기능 플래그 시스템이 포함된 빌드 스크립트

src/
  entrypoints/cli.tsx     # CLI 엔트리포인트
  commands.ts             # 명령 레지스트리 (slash 명령)
  tools.ts                # 도구 레지스트리 (에이전트 도구)
  QueryEngine.ts          # LLM 쿼리 엔진
  screens/REPL.tsx        # 메인 대화형 UI (Ink/React)

  commands/               # /slash 명령 구현체
  tools/                  # 에이전트 도구 구현체 (Bash, Read, Edit 등)
  components/             # Ink/React 터미널 UI 컴포넌트
  hooks/                  # React 훅
  services/               # API 클라이언트, MCP, OAuth, 분석 스텁
    api/                  # API 클라이언트 + Codex 페치 어댑터
    oauth/                # OAuth 흐름 (Anthropic + OpenAI)
  state/                  # 앱 상태 저장소
  utils/                  # 유틸리티
    model/                # 모델 설정, 제공자, 유효성 검사
  skills/                 # 스킬 시스템
  plugins/                # 플러그인 시스템
  bridge/                 # IDE 브리지
  voice/                  # 음성 입력
  tasks/                  # 백그라운드 작업 관리
```

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| **런타임** | [Bun](https://bun.sh) |
| **언어** | TypeScript |
| **터미널 UI** | React + [Ink](https://github.com/vadimdemedes/ink) |
| **CLI 파싱** | [Commander.js](https://github.com/tj/commander.js) |
| **스키마 검증** | Zod v4 |
| **코드 검색** | ripgrep (내장) |
| **프로토콜** | MCP, LSP |
| **API** | Anthropic Messages, OpenAI Codex, AWS Bedrock, Google Vertex AI |

---

## IPFS 미러

이 리포지토리의 전체 복사본은 Filecoin을 통해 IPFS에 영구적으로 고정되어 있습니다:

| 항목 | 내용 |
|---|---|
| **CID** | `bafybeiegvef3dt24n2znnnmzcud2vxat7y7rl5ikz7y7yoglxappim54bm` |
| **게이트웨이** | https://w3s.link/ipfs/bafybeiegvef3dt24n2znnnmzcud2vxat7y7rl5ikz7y7yoglxappim54bm |

이 리포지토리가 중단되더라도 코드는 영원히 존재합니다.

---

## 기여하기

기여는 언제나 환영합니다. 34개의 고장난 기능 플래그 중 하나를 복구하려는 경우, 먼저 [FEATURES.md](FEATURES.md)의 재구성 노트를 확인하세요. 대부분 컴파일 직전 단계이며 소규모 래퍼나 누락된 에셋만 필요합니다.

1. 리포지토리를 포크합니다.
2. 기능 브랜치를 생성합니다 (`git checkout -b feat/my-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'feat: add something'`).
4. 브랜치에 푸시합니다 (`git push origin feat/my-feature`).
5. Pull Request를 엽니다.

---

## 라이선스

원본 Claude Code 소스는 Anthropic의 자산입니다. 이 포크 버전은 소스가 npm 배포를 통해 공개되었기 때문에 존재합니다. 사용 시 본인의 판단에 따르십시오.
