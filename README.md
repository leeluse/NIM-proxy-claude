# NIM Proxy for Hermes (via LiteLLM)

This proxy is tuned for Hermes, not Claude-compatible aliases.

It exposes Hermes-friendly model names such as:
- minimax-m2.5
- kimi-k2.5
- glm5
- gemma-4-31b-it
- deepseek-v3.1-terminus

It also exposes the raw NVIDIA NIM model names so Hermes can call them directly.

## Files
- config.yaml: LiteLLM routing config for NVIDIA NIM
- nim: helper script to start, test, stop, and inspect the proxy
- .env: local secrets file for NVIDIA_NIM_API_KEY and LITELLM_MASTER_KEY

## Setup
1. Put your NVIDIA API key in `.env`:

```env
NVIDIA_NIM_API_KEY=nvapi-your-key-here
LITELLM_MASTER_KEY=sk-litellm-local
```

2. Start the proxy:

```bash
./nim start_proxy
```

3. Test the proxy:

```bash
./nim test
./nim models
```

## Hermes config example

Use this in Hermes:

```yaml
model:
  default: minimax-m2.5
  provider: custom
  base_url: http://localhost:4000/v1
  api_key: sk-litellm-local
```

You can replace `minimax-m2.5` with any exposed model name from `./nim models`.
