# rtainjapan-twitter-api-node を殆ど改変してないやつ

<!-- TOC depthFrom:1 depthTo:3 insertAnchor:false orderedList:false -->

- [rtainjapan-twitter-api-node を殆ど改変してないやつ](#rtainjapan-twitter-api-node-を殆ど改変してないやつ)
  - [概要](#概要)
  - [Config](#config)
  - [動かす](#動かす)

<!-- /TOC -->

----

## 概要

- [.env.example](.env.example)3行目の`mysql://`を`postgres://`に変更して[.env](/env)にコピーしただけ。

## Config

設定項目の定義: [src/app/config.ts](src/app/config.ts)

CORSはクライアントサーバーからproxy越しに使う分には特に設定する必要ないはず。

## 動かす

([node.js](https://nodejs.org/ja/download)をインストールし)、[本家README](https://github.com/RTAinJapan/rtainjapan-twitter-api-node)のように設定。
```
cd rtainjapan-twitter-api-node
npm install
npm run dev
```
