# StudyStep Frontend

フロントエンド - 段階的学習支援プラットフォーム

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.example`を`.env`にコピー：

```bash
cp .env.example .env
```

`.env`ファイルを編集して、バックエンドURLを設定：
```
REACT_APP_API_URL=http://localhost:5000
```

本番環境では、RenderのバックエンドURLに変更：
```
REACT_APP_API_URL=https://your-backend-app.onrender.com
```

### 3. 起動
```bash
# 開発サーバー起動
npm start
```

ブラウザで http://localhost:3000 が自動的に開きます。

### 4. ビルド
```bash
# 本番用ビルド
npm run build
```

## 📱 機能

- **問題入力**：テキストまたは画像で問題を入力
- **教科選択**：英語、社会、理科に対応
- **段階的表示**：
  - 英語：1文字ずつ表示
  - 社会・理科：段階的なヒント表示
- **レスポンシブデザイン**：スマホ、タブレット、PCに対応

## 🌐 Vercelへのデプロイ

### 方法1：Vercel CLI
```bash
# Vercel CLIをインストール
npm i -g vercel

# ログイン
vercel login

# デプロイ
vercel
```

### 方法2：GitHub連携（推奨）
1. コードをGitHubにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. "New Project"をクリック
4. GitHubリポジトリを選択
5. 設定：
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Environment Variables**: 
     - `REACT_APP_API_URL`: RenderのバックエンドURL
6. "Deploy"をクリック

## 🔧 環境変数（Vercel）

Vercelのプロジェクト設定で以下を追加：

| 変数名 | 値 | 説明 |
|--------|---|------|
| `REACT_APP_API_URL` | `https://your-backend.onrender.com` | バックエンドAPI URL |

## 📝 注意事項

- バックエンドを先にデプロイしてからフロントエンドをデプロイ
- 環境変数は必ず設定する
- CORS設定を忘れずに
