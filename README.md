# NIM Proxy for Claude Code

Claude Code 가 NVIDIA NIM(NVIDIA Inference Microservice) 백엔드를 사용할 수 있도록 해주는 경량 프록시 서버입니다. Anthropic API 형식을 OpenAI 호환 형식으로 변환하여 NIM 과 연동합니다.

## 주요 기능

- **Anthropic ↔ OpenAI 형식 변환**: Claude Code 의 Anthropic API 요청을 NIM 이 이해할 수 있는 OpenAI 호환 형식으로 변환
- **스트리밍 지원**: 실시간 스트리밍 응답으로 빠른 첫 토큰 제공
- **자동 토큰 관리**: 컨텍스트 한도 초과 시 자동 잘라내기 (auto-truncation)
- **도구 이름 단축**: NIM 의 64 자 도구 이름 제한 자동 처리
- **Think 태그 파싱**: `<think>...</think>` 형식의 사고 과정 태그 처리
- **다양한 모델 지원**: Qwen, DeepSeek, GLM 등 NIM 호환 모델 전체

## 설치

```bash
# Python 3.11+ 필요
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

## 설정

`.env` 파일 설정:

```env
# NVIDIA API 키 (필수)
NVIDIA_API_KEY=your_api_key_here

# NIM 베이스 URL (선택, 기본값: https://integrate.api.nvidia.com/v1)
NIM_BASE_URL=https://integrate.api.nvidia.com/v1

# 기본 모델 (선택)
DEFAULT_MODEL=qwen/qwen3.5-397b-a17b

# 서버 설정 (선택)
HOST=0.0.0.0
PORT=8082
TIMEOUT=600
```

API 키는 [NVIDIA Build](https://build.nvidia.com) 에서 무료로 발급받을 수 있습니다.

## 빠른 시작 (권장)

`./agent` 스크립트를 사용하면 프록시 서버 시작과 Claude Code 실행을 한 번에 할 수 있습니다:

```bash
./agent
```

이 스크립트는 다음을 자동으로 수행합니다:

1. NIM 프록시 서버가 실행 중인지 확인 (8082 포트)
2. 서버가 꺼져 있으면 백그라운드에서 자동 시작
3. Claude Code 를 NIM 프록시와 함께 실행

## 수동 실행

### 1 단계: 프록시 서버 시작

```bash
python server.py
```

또는 uvicorn 직접 사용:

```bash
uvicorn server:app --host 0.0.0.0 --port 8082
```

### 2 단계: Claude Code 실행

프록시 서버가 실행 중인지 확인한 후 다음 환경변수와 함께 Claude Code 를 사용하세요:

```bash
ANTHROPIC_BASE_URL=http://localhost:8082 ANTHROPIC_AUTH_TOKEN=dummy claude
```

또는 Claude Code 내에서:

```bash
/claude ANTHROPIC_BASE_URL=http://localhost:8082 ANTHROPIC_AUTH_TOKEN=dummy
```

## 윈도우에서 사용

가상환경 활성화:

```powershell
.venv\Scripts\activate
```

서버 시작:

```powershell
python server.py
```

Claude Code 실 (PowerShell):

```powershell
$env:ANTHROPIC_BASE_URL = "http://localhost:8082"
$env:ANTHROPIC_AUTH_TOKEN = "dummy"
claude
```

## 지원되는 모델

| 모델                      | 컨텍스트 한도  |
| ------------------------- | -------------- |
| qwen/qwen3.5-397b-a17b    | 202,752 tokens |
| deepseek-ai/deepseek-v3-1 | 160,000 tokens |
| nvidia/glm-5-20b-chat     | 205,000 tokens |
| z-ai/glm5                 | 205,000 tokens |

`MODEL_MAP` 환경변수로 매핑을 커스터마이즈할 수 있습니다:

```env
MODEL_MAP={"claude-sonnet-4-5-20250101":"qwen/qwen3.5-397b-a17b"}
```

ㅌ

## 아키텍처

```
Claude Code
     │
     ▼
 Anthropic API 형식
     │
     ▼
┌─────────────────┐
│  NIM Proxy      │
│  proxy.py       │  ← 형식 변환 및 스트리밍
└─────────────────┘
     │
     ▼
 OpenAI 호환 형식
     │
     ▼
 NVIDIA NIM (Llama, Qwen, DeepSeek, ...)
```

## 라이선스

MIT
