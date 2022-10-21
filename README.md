# rtainjapan-twitter-api-node

開発者向けドキュメント: [DEVELOP.md](./DEVELOP.md)

## Config

`config/default.json` を参考に、設定ファイル `local.json` を作成してください

### Twitter

[Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) で Twitter API v2 のアプリケーションを登録してください

```json
{
  "hashtag": "#rtainjapan",
  "cache": {
    "ttl": 60,
    "enabled": false
  },
  "twitter": {
    "apiKey": "<API Key>",
    "apiSecret": "<API Secret>",
    "accessToken": "<Access Token>",
    "accessSecret": "<Access Secret>"
  }
}
```

## License

Apache-2.0