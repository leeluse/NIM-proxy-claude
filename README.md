# 🚀 NIM Proxy for Claude Code (via LiteLLM)

NVIDIA NIM(NVIDIA Inference Microservice) 백엔드를 사용하여 **Claude Code**를 무료(또는 저렴한 NIM 크레딧)로 사용할 수 있도록 해주는 통합 프록시 환경입니다.

이 레포지토리는 **LiteLLM Docker**를 활용하여 Anthropic API 요청을 NVIDIA NIM의 OpenAI 호환 API로 자동 변환하고 라우팅합니다.

---

## 🛠️ 주요 기능

- **LiteLLM 기반 프록시**: Docker 컨테이너를 통해 안정적으로 NIM 모델(Qwen, DeepSeek, GLM-5 등) 연동
- **Claude Code 완벽 호환**: `claude-sonnet-4-6` 등 클로드가 기대하는 모델 별칭을 NIM 모델에 1:1 매핑
- **통합 관리 도구 (`nim`)**: 시작, 테스트, 클로드 실행을 하나의 스크립트로 관리
- **보안 설정**: `.env` 파일을 통해 API Key를 안전하게 관리 (`.gitignore` 포함)
- **Windows 친화적**: Git Bash/WSL 환경에서 한 번의 명령어로 단축어(`claude-nim`) 등록 가능

---

## 🏗️ 설치 및 설정

### 1. 선결 조건
- **Docker Desktop** 실행 중이어야 함
- **Git Bash** (또는 WSL/Linux 셸) 권장

### 2. API Key 설정
`.env` 파일을 생성하고 본인의 NVIDIA API Key를 입력합니다. (이미 설정되어 있다면 패스)
```env
NVIDIA_NIM_API_KEY=nvapi-your-key-here
```

### 3. 모델 매핑 (`config.yaml`)
`config.yaml`에서 Claude Code의 별칭을 원하는 NIM 모델로 자유롭게 변경할 수 있습니다.
- `claude-sonnet-4-6` -> Qwen 3.5 (122B)
- `claude-opus-4-6`   -> GLM-5
- `claude-haiku-4-5`  -> Kimi K2.5

---

## 🚀 사용법 (Quick Start)

### 1단계: 프록시 서버 시작
```bash
$ ./nim start_proxy
```

### 2단계: 연결 테스트
프록시가 정상적으로 작동하고 모델 목록이 나오는지 확인합니다.
```bash
$ ./nim test
```

### 3단계: Claude Code 실행
```bash
$ ./nim claude
```

---

## 💡 유용한 팁

### 1. 어디서든 `claude-nim`으로 실행하기
터미널 설정파일(`~/.bashrc`)에 별칭을 등록하면 현재 폴더가 아니더라도 실행 가능합니다.
```bash
$ echo "alias claude-nim='$(pwd)/nim claude'" >> ~/.bashrc
$ source ~/.bashrc

# 이제 바로 실행 가능!
$ claude-nim
```

### 2. 로그 확인 및 종료
```bash
$ ./nim logs    # 실시간 로그 확인 (Docker)
$ ./nim stop    # 프록시 서버(컨테이너) 완전 종료
```

---

## 🏛️ 아키텍처 흐름

1. **Claude Code** (Local CLI)
2. ➔ **LiteLLM Proxy** (Docker Container: 4000 port)
3. ➔ **NVIDIA NIM API** (https://integrate.api.nvidia.com/v1)
4. ➔ **Open Source Models** (Qwen, DeepSeek V3, ...)

---

## 📜 라이선스
MIT License
