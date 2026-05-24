---
description: Docker / nginx ローカル確認環境を扱う場合の方針
paths:
  - "docker/**"
  - "docker-compose.yml"
---

# Docker / nginx ローカル確認環境方針

## 利用方針

ユーザーがローカル確認環境・Docker 起動・nginx 配信に関する依頼をした場合、Required reading として以下を候補に含める：

- `docker/Dockerfile`
- `docker/nginx.conf`
- `docker-compose.yml`

通常の画面モック制作では、Docker / nginx 構成を無理に編集対象に含めない。

## 運用範囲

- Docker はローカル確認専用であり、本番インフラへ膨らませない
- 画面モック制作のみの案件では Docker 構成を触らない
