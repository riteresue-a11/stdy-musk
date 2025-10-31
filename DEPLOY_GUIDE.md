# 🚀 デプロイガイド - StudyStep

## 📋 デプロイの全体像

```
1. GitHubにコードをアップロード
   ↓
2. Renderでバックエンドをデプロイ
   ↓
3. Vercelでフロントエンドをデプロイ
   ↓
4. 環境変数を相互に設定
   ↓
5. 完成！🎉
```

---

## ステップ1: GitHubにコードをアップロード

### 1-1. リポジトリの準備
既に`riteresue-at1/stdy-musk`リポジトリがあるので、そこにコードをアップロードします。

### 1-2. コマンドでアップロード

```bash
# ローカルのstdy-muskディレクトリに移動
cd /path/to/stdy-musk

# Gitの初期化（まだしていない場合）
git init

# リモートリポジトリを追加
git remote add origin https://github.com/riteresue-at1/stdy-musk.git

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: StudyStep full-stack application"

# プッシュ
git push -u origin main
```

**注意**: もし`main`ではなく`master`ブランチの場合は、最後のコマンドを`git push -u origin master`に変更してください。

---

## ステップ2: Renderでバックエンドをデプロイ

### 2-1. Renderにアクセス
1. [Render](https://render.com)を開く
2. GitHubアカウントでログイン済み

### 2-2. Web Serviceを作成
あなたが開いていた画面の続きから：

1. **リポジトリ選択**: `riteresue-at1/stdy-musk` を選択
2. **次へ**をクリック

### 2-3. 設定項目を入力

| 項目 | 値 |
|------|-----|
| **Name** | `studystep-backend`（好きな名前でOK） |
| **Region** | `Singapore`（日本に近い） |
| **Branch** | `main`（または`master`） |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### 2-4. 環境変数を設定

"Environment"セクションで"Add Environment Variable"をクリック：

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | （後で取得するAPIキー） |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `*`（最初は`*`で全て許可、後でVercelのURLに変更） |

### 2-5. プランを選択
- **Free**プランを選択（月750時間まで無料）

### 2-6. デプロイ開始
- "Create Web Service"をクリック
- 5-10分待つ
- デプロイ完了後、URLが表示される
  - 例：`https://studystep-backend.onrender.com`
- **このURLをメモしておく！**

### 2-7. 動作確認
ブラウザで以下にアクセス：
```
https://studystep-backend.onrender.com/health
```

以下のような表示が出ればOK：
```json
{"status":"OK","message":"StudyStep Backend is running"}
```

---

## ステップ3: Gemini APIキーを取得

### 3-1. Google AI Studioにアクセス
1. [Google AI Studio](https://makersuite.google.com/app/apikey)を開く
2. Googleアカウントでログイン

### 3-2. APIキーを作成
1. "Create API Key"をクリック
2. プロジェクトを選択（または新規作成）
3. APIキーが生成される（例：`AIzaSyD...`）
4. **コピーする**

### 3-3. RenderにAPIキーを設定
1. Renderのダッシュボードに戻る
2. 作成した`studystep-backend`サービスを開く
3. 左メニューから"Environment"をクリック
4. `GEMINI_API_KEY`の値を編集して、コピーしたAPIキーを貼り付け
5. "Save Changes"をクリック
6. 自動的に再デプロイされる

---

## ステップ4: Vercelでフロントエンドをデプロイ

### 4-1. Vercelにアクセス
1. [Vercel](https://vercel.com)を開く
2. GitHubアカウントでログイン済み

### 4-2. 新しいプロジェクトを作成
1. "Add New..."をクリック
2. "Project"を選択
3. "Import Git Repository"で`riteresue-at1/stdy-musk`を選択

### 4-3. 設定項目を入力

| 項目 | 値 |
|------|-----|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

### 4-4. 環境変数を設定

"Environment Variables"セクションで以下を追加：

| Name | Value |
|------|-------|
| `REACT_APP_API_URL` | （ステップ2-6でメモしたRenderのURL） |

例：
```
REACT_APP_API_URL=https://studystep-backend.onrender.com
```

### 4-5. デプロイ開始
- "Deploy"をクリック
- 3-5分待つ
- デプロイ完了後、URLが表示される
  - 例：`https://stdy-musk.vercel.app`
- **このURLをメモしておく！**

---

## ステップ5: 環境変数の相互設定

### 5-1. RenderのFRONTEND_URLを更新
1. Renderのダッシュボードで`studystep-backend`を開く
2. "Environment"をクリック
3. `FRONTEND_URL`の値を、ステップ4-5でメモしたVercelのURLに変更
   - 例：`https://stdy-musk.vercel.app`
4. "Save Changes"をクリック
5. 自動的に再デプロイされる

---

## ステップ6: 動作確認

### 6-1. サイトにアクセス
ブラウザでVercelのURLを開く：
```
https://stdy-musk.vercel.app
```

### 6-2. テスト
1. 教科を選択（例：英語）
2. 問題を入力（例：`What is the capital of France?`）
3. "解答を見る"をクリック
4. 段階的に解答が表示されることを確認

---

## 🎉 完成！

おめでとうございます！あなたの学習支援サイトが世界中からアクセスできるようになりました。

### 次にやること

1. **Google AdSenseの申請**
   - サイトが公開されたら、Google AdSenseに申請
   - 承認されたら、広告コードを追加

2. **SEO対策**
   - タイトル・メタタグの最適化
   - Google Search Consoleに登録

3. **SNSでシェア**
   - Twitter、Instagram等で宣伝
   - 学生コミュニティに紹介

4. **フィードバック収集**
   - ユーザーの意見を聞いて改善

---

## ❗ トラブルシューティング

### エラー: "Failed to solve question"
- RenderのログでGemini APIキーが正しく設定されているか確認
- API使用量の上限を確認

### エラー: "Network Error"
- Renderの`FRONTEND_URL`にVercelのURLが正しく設定されているか確認
- Vercelの`REACT_APP_API_URL`にRenderのURLが正しく設定されているか確認

### Renderのサービスがスリープする
- 無料プランは15分間アクセスがないとスリープ
- 最初のアクセス時に起動するため30秒ほどかかる場合がある

---

## 📞 サポート

質問があれば、GitHubのIssueで質問してください！
