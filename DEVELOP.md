# 開発者向け

## Requirements

- Node.js (14以上)
- MySQL
  - Dockerの利用を推奨（後述）

## 下準備

### env ファイル準備

- 適宜環境に合わせて変更してください

```
cp .env.example .env
```

### npm モジュールのインストール

```
npm install
```

### docker-compose.override 準備

- docker-compose の利用を推奨します
- 開発用の docker-compose.override ファイルを用意してください

```yml:docker-compose.override.yml
# 例

services:
  web:
    ports:
      - "3303:3000"
  db:
    ports:
      - "13306:3306"
    volumes:
      - prac-dev:/var/lib/mysql
volumes:
  prac-dev:

```

Config の設定もお忘れなく [README.md](./README.md)

## 開発するとき

docker-compose で各コンテナを起動します

```
docker-compose up --build -d
```

Node.js コンテナも起動していますが、開発時には nodemon でのファイル監視が使えます

```
npm run dev
```

**docker-compose で割り当てたポートとの重複に注意してください**

## テスト

`__tests__` にテストファイルを配置します。`e2e` と `unit` にそれぞれ配置し、以下のコマンドでテストを実行します

```
npm run test
```