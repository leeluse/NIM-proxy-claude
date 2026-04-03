# Codex API 지원: 기능 패리티 및 UI 개편

## 요약
이 풀 리퀘스트는 OpenAI Codex 백엔드(`chatgpt.com/backend-api/codex/responses`)에 대한 완전한 기능 패리티(parity)와 명시적인 UI 지원을 도입합니다. 이제 코드베이스는 백엔드에 무관하게 작동하며, 현재 인증 상태에 따라 Anthropic Claude와 OpenAI Codex 스키마 사이를 부드럽게 전환합니다. 추론 애니메이션, 토큰 과금, 다중 모드 시각적 입력과 같은 기능도 그대로 유지됩니다.

## 주요 변경 사항

### 1. Codex API 게이트웨이 어댑터 (`codex-fetch-adapter.ts`)
- **네이티브 비전 변환**: Anthropic의 `base64` 이미지 스키마가 이제 Codex의 `input_image` 페이로드로 정확하게 매핑됩니다.
- **엄격한 페이로드 매핑**: 내부 매핑 로직을 리팩토링하여 `msg.content` 항목을 `input_text`로 정확하게 변환함으로써, OpenAI의 엄격한 `v1/responses` 유효성 검사 규칙(`Invalid value: 'text'`)을 우회합니다.
- **도구 로직 수정**: `tool_result` 항목을 최상위 `function_call_output` 객체로 적절히 라우팅하여, 로컬 CLI 도구 실행(파일 읽기, Bash 루프 등)이 "도구 출력을 찾을 수 없음" 오류 없이 Codex 로직으로 깔끔하게 피드백되도록 보장합니다.
- **캐시 제거**: 전송 전에 도구 바인딩 및 프롬프트에서 Anthropic 전용 `cache_control` 주석을 깔끔하게 제거하여 Codex API가 형식이 잘못된 JSON을 거부하지 않도록 했습니다.

### 2. 심층 UI 및 라우팅 통합
- **모델 정리 (`model.ts`)**: `getPublicModelDisplayName` 및 `getClaudeAiUserDefaultModelDescription`을 업데이트하여 Codex GPT 문자열을 인식하도록 했습니다. `gpt-5.1-codex-max`와 같은 모델은 이제 CLI 시각적 출력에서 원시 프록시 ID 대신 `Codex 5.1 Max`로 아름답게 매핑됩니다.
- **기본 재라우팅**: `isCodexSubscriber()`를 인식하도록 `getDefaultMainLoopModelSetting`을 수정하여, `sonnet46` 대신 `gpt-5.2-codex`를 자동으로 기본값으로 설정합니다.
- **과금 시각화 (`logoV2Utils.ts`)**: 인증 시 터미널 헤더에 `Codex API Billing`이 표시되도록 `formatModelAndBilling` 로직을 리팩토링했습니다.

### 3. 추론 및 메트릭 지원
- **생각 중 애니메이션**: `codex-fetch-adapter`는 이제 `codex-max` 모델에서 생성된 독점적인 `response.reasoning.delta` SSE 프레임을 의도적으로 가로챕니다. 이를 Anthropic의 `<thinking>` 이벤트로 래핑하여, 표준 CLI의 "Thinking..." 스피너가 OpenAI 추론 시에도 완벽하게 작동하도록 보장합니다.
- **토큰 정확도**: `response.completed` 완료 이벤트를 추적하여 `usage.input_tokens` 및 `output_tokens`를 가져오는 로직을 결합했습니다. 이들은 최종 `message_stop` 토큰 핸들러에 네이티브하게 주입되어, Codex 쿼리가 터미널의 토큰/가격 추적 요약 로직을 올바르게 트리거하도록 합니다.

### 4. Git 관리
- `.gitignore`를 설정하여 스테이징 커밋에서 `openclaw/` 게이트웨이 디렉토리를 안전하고 지속적으로 제외하도록 했습니다.
