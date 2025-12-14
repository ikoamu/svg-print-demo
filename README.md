# SVG Preview Print

Figmaで設計したテンプレートをSVGに変換し、データを動的に埋め込んで印刷可能なドキュメントをプレビューするReactアプリケーションです。

## 機能

- **テンプレート管理**: Figmaで設計したSVGテンプレートを読み込み
- **動的データ埋め込み**: 商品情報（商品名、数量、単価、金額）をSVGに動的に埋め込み
- **複数行対応**: 最大13行の明細表示をサポート
- **小計計算**: 小計行で自動的に前の小計からの合計を計算
- **カスタマイズ可能**: No列の表示/非表示切り替え
- **印刷対応**: `react-to-print`で直接印刷可能

## 技術スタック

- **フロントエンド**: React 19.2.0
- **ビルドツール**: Vite 7.2.4
- **スタイリング**: Tailwind CSS 4.1.17
- **UI コンポーネント**: shadcn/ui
- **SVG処理**: SVGO (SVG optimization)
- **印刷**: react-to-print
- **型チェック**: TypeScript + Biome
- **デプロイ**: GitHub Pages (GitHub Actions)

## プロジェクト構成

```
src/
├── App.tsx                         # メインコンポーネント
├── components/ui/                  # shadcn/ui コンポーネント
├── preview/
│   ├── form.tsx                    # 設定フォーム（支払先、日付など）
│   ├── dialog.tsx                  # プレビューダイアログ
│   ├── preview-content.tsx         # プレビューコンテンツ
│   ├── utils/
│   │   ├── base-info.ts           # 基本情報操作
│   │   ├── detail.ts              # 明細データ操作
│   │   └── svg.ts                 # SVG要素操作
│   ├── constants.ts               # 定数
│   └── template.svg               # SVGテンプレート          
└── detail/
    ├── type.ts                    # 型定義
    ├── item/                      # 商品行の型
    ├── subtotal/                  # 小計行の型
    └── headline/                  # ヘッドライン行の型
```

## セットアップ

### 必要な環境

- Node.js 18.0 以上
- pnpm 9.0 以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/ikoamu/svg-print-demo.git
cd svg-print-demo

# 依存パッケージをインストール
pnpm install
```

## 開発

```bash
# 開発サーバーを起動
pnpm run dev

# ブラウザで http://localhost:5173 にアクセス
```

## ビルド

```bash
# 本番用にビルド
pnpm run build

# ビルド結果をプレビュー
pnpm run preview
```

## コード品質

```bash
# リント・フォーマットチェック
pnpm run lint

# 自動フォーマット
pnpm run format
```

## デプロイ

GitHub Actionsで自動デプロイを設定済みです。`main`ブランチへのプッシュで自動的にGitHub Pagesにデプロイされます。

**公開URL**: https://ikoamu.github.io/svg-print-demo/

## SVG処理パイプライン

### 1. Figmaでテンプレート設計
- `figma/create-template.js`: Figmaスクリプトでテンプレートを生成

### 2. SVGをエクスポート
- FigmaからSVGをエクスポート

### 3. SVG最適化・加工
- `figma-to-svg/prosess-svg.js`: SVGO を使用した処理
  - テキスト要素の右寄せ設定（`text-anchor="end"`）
  - 下線・縦線のID自動生成
  - width/height属性の削除

