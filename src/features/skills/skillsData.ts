import { FiCloud, FiLayout, FiServer, FiTool } from "react-icons/fi";
import {
	SiBiome,
	SiCloudflare,
	SiDocker,
	SiFigma,
	SiGit,
	SiGithubactions,
	SiGo,
	SiNodedotjs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiTailwindcss,
	SiTerraform,
	SiThreedotjs,
	SiTypescript,
	SiVite,
} from "react-icons/si";
import type { SkillCategory } from "./types";

/** TODO: 内容はモック。実際のスキルに差し替える。 */
export const skillCategories: ReadonlyArray<SkillCategory> = [
	{
		id: "frontend",
		label: "Frontend",
		accent: "magenta",
		icon: FiLayout,
		skills: [
			{
				id: "typescript",
				name: "TypeScript",
				level: 5,
				icon: SiTypescript,
				detail: {
					summary:
						"業務・個人開発ともに主言語。型でドメインの制約を表現し、実行前に壊れる箇所を潰す書き方を好みます。",
					experience: "2019 〜 / 約 6 年",
					highlights: [
						"判別可能なユニオンによる状態設計",
						"ジェネリクスを使った共通コンポーネントの型付け",
						"any を残さない段階的な JavaScript 移行",
					],
				},
			},
			{
				id: "react",
				name: "React",
				level: 4,
				icon: SiReact,
				detail: {
					summary:
						"SPA の設計から実装まで。機能単位でディレクトリを切り、状態は必要な階層まで下げて持たせる方針です。",
					experience: "2020 〜 / 約 5 年",
					highlights: [
						"feature 単位のディレクトリ設計",
						"Suspense と lazy による分割ロード",
						"カスタムフックへの副作用の切り出し",
					],
					links: [{ label: "GitHub", href: "https://github.com/Th3rm1t0" }],
				},
			},
			{
				id: "tailwind",
				name: "Tailwind CSS",
				level: 4,
				icon: SiTailwindcss,
				detail: {
					summary:
						"デザイントークンを CSS 変数に寄せ、ユーティリティ側からは変数だけを参照する構成で運用しています。",
					experience: "2021 〜 / 約 4 年",
					highlights: [
						"v4 の @theme によるトークン定義",
						"data-theme 属性でのライト / ダーク切り替え",
						"motion-safe を前提としたアニメーション設計",
					],
				},
			},
			{
				id: "vite",
				name: "Vite",
				level: 4,
				icon: SiVite,
				detail: {
					summary:
						"個人開発のビルド基盤。このサイトも Vite 8 で、バンドラは rolldown に切り替えて運用しています。",
					experience: "2021 〜 / 約 4 年",
					highlights: [
						"rolldown への移行",
						"動的 import によるチャンク分割",
						"devcontainer 上での HMR 調整",
					],
				},
			},
			{
				id: "three",
				name: "Three.js",
				level: 2,
				icon: SiThreedotjs,
				detail: {
					summary:
						"React Three Fiber 経由で、演出目的に使う程度。このサイトのヒーローの回転ボックスがそれです。",
					experience: "2024 〜 / 約 1 年",
					highlights: ["React Three Fiber", "ASCII レンダリング表現"],
				},
			},
		],
	},
	{
		id: "backend",
		label: "Backend",
		accent: "cyan",
		icon: FiServer,
		skills: [
			{
				id: "go",
				name: "Go",
				level: 3,
				icon: SiGo,
				detail: {
					summary:
						"API サーバーの実装に使用。標準ライブラリ中心で、依存を増やしすぎない構成を好みます。",
					experience: "2022 〜 / 約 3 年",
					highlights: ["net/http による API 実装", "テーブル駆動テスト"],
				},
			},
			{
				id: "python",
				name: "Python",
				level: 4,
				icon: SiPython,
				detail: {
					summary:
						"検証コードや自動化スクリプトの第一候補。データ処理まわりの雑務はだいたいこれで書きます。",
					experience: "2018 〜 / 約 7 年",
					highlights: ["FastAPI での API 実装", "データ整形・集計スクリプト"],
				},
			},
			{
				id: "node",
				name: "Node.js",
				level: 4,
				icon: SiNodedotjs,
				detail: {
					summary:
						"フロントと言語を揃えられるのが強み。BFF や CLI ツールの実装に使っています。",
					experience: "2019 〜 / 約 6 年",
					highlights: ["BFF レイヤーの実装", "社内向け CLI ツール"],
				},
			},
			{
				id: "postgresql",
				name: "PostgreSQL",
				level: 3,
				icon: SiPostgresql,
				detail: {
					summary:
						"主に使うリレーショナルデータベース。まずスキーマを固めてからアプリを書く進め方です。",
					experience: "2020 〜 / 約 5 年",
					highlights: [
						"インデックス設計と実行計画の確認",
						"マイグレーション運用",
					],
				},
			},
		],
	},
	{
		id: "infra",
		label: "Infra",
		accent: "lime",
		icon: FiCloud,
		skills: [
			{
				id: "docker",
				name: "Docker",
				level: 4,
				icon: SiDocker,
				detail: {
					summary:
						"開発環境は基本 devcontainer。手元の状態に依存しない環境を用意するところから始めます。",
					experience: "2020 〜 / 約 5 年",
					highlights: [
						"devcontainer による開発環境の統一",
						"マルチステージビルド",
					],
				},
			},
			{
				id: "aws",
				name: "AWS",
				level: 3,
				detail: {
					summary:
						"コンテナとサーバーレスを中心に利用。運用まで見据えて構成を決めるようにしています。",
					experience: "2021 〜 / 約 4 年",
					highlights: [
						"ECS / Fargate でのコンテナ運用",
						"Lambda + API Gateway",
					],
				},
			},
			{
				id: "cloudflare",
				name: "Cloudflare",
				level: 3,
				icon: SiCloudflare,
				detail: {
					summary:
						"静的サイトと軽量な API の配信先。エッジまで処理を寄せられるのが気に入っています。",
					experience: "2022 〜 / 約 3 年",
					highlights: ["Pages での静的サイト配信", "Workers での軽量 API"],
				},
			},
			{
				id: "terraform",
				name: "Terraform",
				level: 2,
				icon: SiTerraform,
				detail: {
					summary:
						"既存構成の変更や小規模なリソース管理が中心。ゼロから大きく設計した経験はまだ少なめです。",
					experience: "2023 〜 / 約 2 年",
					highlights: ["モジュール分割", "リモート state の管理"],
				},
			},
		],
	},
	{
		id: "tooling",
		label: "Tooling",
		accent: "orange",
		icon: FiTool,
		skills: [
			{
				id: "git",
				name: "Git",
				level: 5,
				icon: SiGit,
				detail: {
					summary:
						"毎日さわる道具。あとから履歴を読んで意図を追えることを優先してコミットを切ります。",
					experience: "2018 〜 / 約 7 年",
					highlights: ["粒度をそろえたコミット運用", "rebase による履歴整理"],
				},
			},
			{
				id: "github-actions",
				name: "GitHub Actions",
				level: 4,
				icon: SiGithubactions,
				detail: {
					summary:
						"CI/CD の主軸。lint・型チェック・ビルドを固めて、壊れた状態が main に入らないようにします。",
					experience: "2020 〜 / 約 5 年",
					highlights: [
						"lint / typecheck / build の並列実行",
						"デプロイの自動化",
					],
				},
			},
			{
				id: "biome",
				name: "Biome",
				level: 4,
				icon: SiBiome,
				detail: {
					summary:
						"ESLint + Prettier から移行。1 つのツールで完結して速いのが選定理由です。",
					experience: "2024 〜 / 約 1 年",
					highlights: ["ESLint / Prettier からの移行", "CI での check 実行"],
					links: [{ label: "Zenn", href: "https://zenn.dev/th3rm1t3" }],
				},
			},
			{
				id: "figma",
				name: "Figma",
				level: 2,
				icon: SiFigma,
				detail: {
					summary:
						"デザインを読み取って実装に落とす用途が中心。自分で一から作り込むところまではいきません。",
					experience: "2022 〜 / 約 3 年",
					highlights: [
						"デザインデータの読み取りと実装",
						"簡単なワイヤーフレーム作成",
					],
				},
			},
		],
	},
];
