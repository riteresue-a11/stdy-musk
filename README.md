# 📚 StudyStep - 段階的学習支援プラットフォーム

英語・社会・理科の問題を段階的に解答表示する学習支援サイト

## ✨ 特徴

- **段階的解答表示**：一度に答えを見せず、段階的にヒントを表示
- **画像認識対応**：問題のスクリーンショットから自動で問題を抽出
- **AI搭載**：Google Gemini APIによる高精度な解答生成
- **3教科対応**：英語、社会、理科

### 段階的表示の仕組み

#### 英語
- 1文字ずつ表示
- 例：`w` → `we` → `wen` → `went`

#### 社会・理科
- 4段階のヒント表示
  1. キーワード・カテゴリー
  2. 簡単なヒント
  3. 詳しい説明
  4. 完全な解答

## 🏗️ プロジェクト構成

```
stdy-musk/
├── frontend/          # React アプリケーション
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
│
├── backend/           # Node.js + Express API
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🚀 クイックスタート

### 必要なもの
- Node.js (v16以上)
- npm または yarn
- Google Gemini APIキー（[取得方法](#gemini-apiキーの取得)）

### 1. バックエンドのセットアップ

```bash
cd backend
npm install
cp .env.example .env
# .envファイルにAPIキーを設定
npm start
```

詳細は [backend/README.md](backend/README.md) を参照

### 2. フロントエンドのセットアップ

```bash
cd frontend
npm install
cp .env.example .env
# .envファイルにバックエンドURLを設定
npm start
```

詳細は [frontend/README.md](frontend/README.md) を参照

## 🌐 デプロイ

### バックエンド → Render

1. [Render](https://render.com)にGitHubでログイン
2. "New Web Service"を作成
3. リポジトリを選択
4. 設定：
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `GEMINI_API_KEY`: あなたのAPIキー
     - `FRONTEND_URL`: VercelのURL（後で設定）

### フロントエンド → Vercel

1. [Vercel](https://vercel.com)にGitHubでログイン
2. "New Project"を作成
3. リポジトリを選択
4. 設定：
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: RenderのバックエンドURL

## 🔑 Gemini APIキーの取得

1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. Googleアカウントでログイン
3. "Create API Key"をクリック
4. APIキーをコピー
5. `.env`ファイルに貼り付け

**注意**: APIキーは絶対に公開しないこと！

## 💰 収益化戦略

### Google AdSense
- 解答表示後に広告配置
- サイドバーに広告枠を設置

### 広告スペース
- **メイン広告**: 300 x 250 px（解答表示後）
- **サイドバー広告**: 160 x 600 px

## 📊 技術スタック

### フロントエンド
- React 18
- CSS3（カスタムスタイル）
- Axios

### バックエンド
- Node.js
- Express
- Google Generative AI (Gemini)
- Multer（画像アップロード）

### デプロイ
- Vercel（フロントエンド）
- Render（バックエンド）

## 🔒 セキュリティ

- APIキーは環境変数で管理
- CORS設定でフロントエンドのみアクセス許可
- レート制限（15分間に100リクエスト）
- 入力データのバリデーション

## 📝 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します！

## 📧 お問い合わせ

質問や提案があれば、Issueを作成してください。

---

**Happy Learning! 📚✨**
