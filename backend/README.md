# StudyStep Backend API

バックエンドAPIサーバー - 段階的学習支援システム

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.example`を`.env`にコピーして、必要な値を設定：

```bash
cp .env.example .env
```

`.env`ファイルを編集：
```
GEMINI_API_KEY=あなたのAPIキー
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 3. Gemini APIキーの取得方法
1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. Googleアカウントでログイン
3. "Create API Key"をクリック
4. 生成されたAPIキーをコピーして`.env`に貼り付け

### 4. 起動
```bash
# 本番環境
npm start

# 開発環境（自動再起動）
npm run dev
```

## 📡 API エンドポイント

### POST /api/solve/text
テキスト形式の問題を解答

**リクエスト：**
```json
{
  "question": "What is the capital of Japan?",
  "subject": "social"
}
```

**レスポンス：**
```json
{
  "success": true,
  "subject": "social",
  "question": "What is the capital of Japan?",
  "answer": "Tokyo",
  "steps": [
    "It's the largest city in Japan",
    "It's located on the eastern coast of Honshu island",
    "It became the capital in 1868",
    "Tokyo - The capital of Japan since the Meiji Restoration"
  ]
}
```

### POST /api/solve/image
画像から問題を抽出して解答

**リクエスト：**
```json
{
  "imageData": "data:image/jpeg;base64,/9j/4AAQ...",
  "subject": "english"
}
```

**レスポンス：**
```json
{
  "success": true,
  "subject": "english",
  "extractedText": "What is the past tense of 'go'?",
  "answer": "went",
  "steps": ["w", "we", "wen", "went"]
}
```

### GET /health
ヘルスチェック

**レスポンス：**
```json
{
  "status": "OK",
  "message": "StudyStep Backend is running"
}
```

## 🔧 Renderへのデプロイ

1. [Render](https://render.com)にGitHubでログイン
2. "New Web Service"をクリック
3. リポジトリを選択
4. 設定：
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: 
     - `GEMINI_API_KEY`: あなたのAPIキー
     - `FRONTEND_URL`: VercelのURL
5. "Create Web Service"をクリック

## 📝 注意事項

- APIキーは絶対に公開しないこと
- `.env`ファイルはGitにコミットしない
- 本番環境では必ずFRONTEND_URLを設定
