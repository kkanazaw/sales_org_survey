# 組織診断サーベイHTML

## 環境構築

- node前提(v10)

```
npm i
npm run build
npm run serve
``` 

## distディレクトリについて

現在、GitHub Pagesのためdistディレクトリを `.gitignore` から除外している
gh-pagesブランチのみ、distディレクトリがコミットできるようになっている。
[.gitignore ファイルをブランチごとに別の内容にする - Qiita](https://qiita.com/matsuoshi/items/f40d60a5c0a1a169a73b)

1. featureブランチ側ではコミットしない
1. masterブランチにマージ
1. circleciが起動して、gh-pagesブランチにmasterブランチをマージ、build
1. 変更されたdistディレクトリをコミット


