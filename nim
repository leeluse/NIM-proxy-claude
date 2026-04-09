#!/usr/bin/env bash

set -a
source ./.env
set +a

ACTION=${1:-"start_proxy"}
API_KEY="${NVIDIA_NIM_API_KEY:-$NVIDIA_NIM_API_KEY_1}"
MASTER_KEY="${LITELLM_MASTER_KEY:-sk-litellm-local}"
PROXY_URL="http://localhost:4000"
CONTAINER_NAME="litellm-nim-hermes"

ensure_proxy_alive() {
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$PROXY_URL/v1/models" -H "Authorization: Bearer $MASTER_KEY")
    if [ "$RESPONSE" != "200" ]; then
        echo "[ERROR] LiteLLM proxy is not responding on $PROXY_URL"
        echo "Run: ./nim start_proxy"
        exit 1
    fi
}

start_proxy() {
    echo "[INFO] Starting LiteLLM proxy for Hermes..."

    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        docker stop $CONTAINER_NAME >/dev/null 2>&1
        docker rm $CONTAINER_NAME >/dev/null 2>&1
    fi

    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        FINAL_CONFIG_PATH=$(pwd -W)/config.yaml
        export MSYS_NO_PATHCONV=1
    else
        FINAL_CONFIG_PATH="$(pwd)/config.yaml"
    fi

    docker run -d \
      -p 4000:4000 \
      -e NVIDIA_NIM_API_KEY="$API_KEY" \
      -e LITELLM_MASTER_KEY="$MASTER_KEY" \
      -e LITELLM_DATABASE_URL="NONE" \
      -e LITELLM_LOG="INFO" \
      -v "$FINAL_CONFIG_PATH:/app/config.yaml" \
      --name $CONTAINER_NAME \
      --restart always \
      docker.litellm.ai/berriai/litellm:main-stable \
      --config /app/config.yaml

    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Hermes LiteLLM proxy is running on $PROXY_URL"
        echo "Test: curl $PROXY_URL/v1/models -H 'Authorization: Bearer $MASTER_KEY'"
        echo "Run Hermes with model names like: minimax-m2.5, kimi-k2.5, glm5"
    else
        echo "[ERROR] Failed to start Docker container"
        exit 1
    fi
}

test_proxy() {
    curl -s "$PROXY_URL/v1/models" -H "Authorization: Bearer $MASTER_KEY"
}

show_models() {
    echo "Available Hermes-facing model names:"
    echo "- minimax-m2.5"
    echo "- kimi-k2.5"
    echo "- glm5"
    echo "- gemma-4-31b-it"
    echo "- deepseek-v3.1-terminus"
    echo "- nvidia_nim/minimaxai/minimax-m2.5"
    echo "- nvidia_nim/moonshotai/kimi-k2.5"
    echo "- nvidia_nim/z-ai/glm5"
    echo "- nvidia_nim/google/gemma-4-31b-it"
    echo "- nvidia_nim/deepseek-ai/deepseek-v3.1-terminus"
}

case "$ACTION" in
    "start"|"start_proxy")
        start_proxy
        ;;
    "test")
        test_proxy
        ;;
    "models")
        show_models
        ;;
    "stop")
        docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
        ;;
    "logs")
        docker logs -f $CONTAINER_NAME
        ;;
    *)
        echo "Usage: $0 {start_proxy|test|models|stop|logs}"
        ;;
 esac