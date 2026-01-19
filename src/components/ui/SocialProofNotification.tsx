/**
 * ===================================================================
 * SocialProofNotification.tsx
 * ===================================================================
 * 
 * 【このコンポーネントの役割】
 * 「他のユーザーがエントリーしました」という通知を画面左下に表示
 * これは「社会的証明（ソーシャルプルーフ）」と呼ばれるグ手法
 * 「他の人も使っている」という安心感を与え、ユーザーの行動を促進
 * 
 * 【ポイント】
 * - useState: コンポーネント内で状態（データ）を管理するReactの基本フック
 * - useEffect: 副作用（タイマーやAPI呼び出し等）を管理するReactのフック
 * - useLocation: 現在のURL（パス）を取得するReact Routerのフック
 * - AnimatePresence: 要素の出入りにアニメーションをつけるFramer Motionの機能
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// ===================================================================
// ダミーデータの定義
// ===================================================================
// 実際のバックエンドがないため、表示用のフェイクデータを配列で定義
// ドライバー求人サイトなので、30〜50代男性を中心に設定
const DUMMY_ENTRIES = [
  { area: '東京都', attr: '40代男性' },
  { area: '神奈川県', attr: '50代男性' },
  { area: '埼玉県', attr: '40代男性' },
  { area: '千葉県', attr: '30代男性' },
  { area: '大阪府', attr: '40代男性' },
  { area: '愛知県', attr: '50代男性' },
  { area: '福岡県', attr: '30代男性' },
  { area: '北海道', attr: '40代男性' },
  { area: '兵庫県', attr: '50代男性' },
  { area: '静岡県', attr: '40代男性' },
  { area: '茨城県', attr: '30代男性' },
  { area: '広島県', attr: '40代男性' },
  { area: '京都府', attr: '50代男性' },
  { area: '新潟県', attr: '40代男性' },
  { area: '宮城県', attr: '30代男性' },
];

// 通知に表示する時間のラベル
const TIME_LABELS = ['たった今', '1分前', '2分前', '3分前'];

// ===================================================================
// コンポーネント本体
// ===================================================================
export const SocialProofNotification = () => {
  // -------------------------------------------------------------------
  // フック（Hooks）の定義
  // 【重要】Reactのルール: フックは必ずコンポーネントの最上部で、
  //        条件分岐の外で呼び出す必要がある
  // -------------------------------------------------------------------

  // useLocation: 現在のURLパス（例: "/step2", "/thanks"）を取得
  const { pathname } = useLocation();

  // useState: 状態を管理するフック
  // [現在の値, 値を更新する関数] = useState(初期値)
  const [isVisible, setIsVisible] = useState(false);           // 通知が表示中かどうか
  const [currentEntry, setCurrentEntry] = useState(DUMMY_ENTRIES[0]); // 現在表示中のデータ
  const [timeLabel, setTimeLabel] = useState(TIME_LABELS[0]);  // 時間ラベル

  // -------------------------------------------------------------------
  // 通知を表示する関数
  // -------------------------------------------------------------------
  const showNotification = () => {
    // Math.random(): 0〜1のランダムな小数を生成
    // Math.floor(): 小数点以下を切り捨てて整数に
    const randomEntry = DUMMY_ENTRIES[Math.floor(Math.random() * DUMMY_ENTRIES.length)];
    const randomTime = TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)];

    // 状態を更新（Reactが自動で画面を再描画）
    setCurrentEntry(randomEntry);
    setTimeLabel(randomTime);
    setIsVisible(true);

    // 4.5秒後に通知を非表示にする
    // setTimeout: 指定ミリ秒後に関数を実行
    setTimeout(() => {
      setIsVisible(false);
    }, 4500);
  };

  // -------------------------------------------------------------------
  // useEffect: 副作用を管理するフック
  // コンポーネントがマウント（画面に表示）された時に実行される
  // -------------------------------------------------------------------
  useEffect(() => {
    // サンクスページでは通知を出さない（早期リターン）
    if (pathname === '/thanks') return;

    // 2秒後に最初の通知を表示
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 2000);

    // その後、15〜30秒間隔でランダムに通知を表示
    // setInterval: 指定間隔で関数を繰り返し実行
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 15000 + 15000);

    // クリーンアップ関数: コンポーネントがアンマウント（画面から消える）時に実行
    // タイマーを解除してメモリリークを防ぐ
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [pathname]); // 依存配列: pathnameが変わったら再実行

  // -------------------------------------------------------------------
  // 条件付きレンダリング
  // 【重要】この早期リターンは必ずフックの後に書く！
  // -------------------------------------------------------------------
  if (pathname === '/thanks') return null;

  // -------------------------------------------------------------------
  // JSX（見た目の定義）
  // -------------------------------------------------------------------
  return (
    // AnimatePresence: 子要素の追加/削除時にアニメーションを適用
    <AnimatePresence>
      {/* isVisibleがtrueの時だけ表示（条件付きレンダリング） */}
      {isVisible && (
        <motion.div
          // Framer Motionのアニメーション設定
          initial={{ opacity: 0, x: -50, y: 20 }}  // 初期状態（左から入ってくる）
          animate={{ opacity: 1, x: 0, y: 0 }}      // 表示状態
          exit={{ opacity: 0, x: -30 }}             // 終了状態（左に消えていく）
          transition={{ duration: 0.4, ease: "easeOut" }}
          // Tailwind CSSクラス
          className="fixed bottom-24 left-4 z-40 max-w-[280px]"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex items-start gap-3">
            {/* アイコン部分 */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>

            {/* テキスト部分 */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="text-gray-400">{timeLabel}、</span>
                <span className="font-bold text-primary">{currentEntry.area}</span>の
                <span className="font-bold text-primary">{currentEntry.attr}</span>が
                <span className="text-green-600 font-bold">エントリー</span>しました
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
