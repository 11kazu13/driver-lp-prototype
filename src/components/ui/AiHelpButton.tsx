/**
 * ===================================================================
 * AiHelpButton.tsx
 * ===================================================================
 * 
 * 【このコンポーネントの役割】
 * 画面右下に表示される「AIチャットボット」起動ボタンです。
 * 入力中に困ったユーザーが気軽に質問できる導線を提供し、
 * フォームからの離脱を防ぐことが目的です。
 * 
 * 【学習ポイント】
 * - 条件付きレンダリング: 特定のページでのみ表示/非表示を切り替え
 * - Framer Motion: ホバー時やクリック時のアニメーション
 * - Fixed positioning: スクロールしても画面に固定表示
 */

import { useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// ===================================================================
// コンポーネント本体
// ===================================================================
export const AiHelpButton = () => {
  // 現在のURLパスを取得
  const { pathname } = useLocation();

  // ボタンが開いているかどうかの状態（将来の拡張用）
  const [isOpen] = useState(false);

  // -------------------------------------------------------------------
  // 表示条件の判定
  // -------------------------------------------------------------------
  // このボタンを表示するページのリスト
  // Step 1（最初のシンプルな選択）とThanks（完了）では不要なので除外
  const targetPaths = [
    '/step2',  // 免許選択
    '/step3',  // 働き方
    '/step4',  // 希望年収
    '/step5',  // こだわり条件
    '/step6',  // エリア・生年月日
    '/step7'   // 名前・電話番号
  ];

  // some(): 配列の要素のうち1つでも条件を満たせばtrueを返す
  // includes(): 文字列に特定の文字が含まれているかチェック
  const shouldShow = targetPaths.some(path => pathname.includes(path));

  // 表示対象外のページでは何も描画しない（nullを返す）
  if (!shouldShow) return null;

  // -------------------------------------------------------------------
  // クリック時の処理
  // -------------------------------------------------------------------
  const handleClick = () => {
    // 現時点ではデモ用のアラートを表示
    // 実際の実装ではチャットモーダルを開く等の処理になる
    alert("AIチャットボットが起動します（Demo）\n\nここに入力支援AIが立ち上がります。");
  };

  // -------------------------------------------------------------------
  // JSX（見た目の定義）
  // -------------------------------------------------------------------
  return (
    // fixed: 画面に対して固定位置に配置
    // bottom-24: 下から96px（CTAボタンと被らないように）
    // right-4: 右から16px
    // z-50: 他の要素より手前に表示
    // pointer-events-none: 吹き出し部分はクリックを透過させる
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">

      {/* 吹き出し（ツールチップ） */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            // アニメーション設定
            initial={{ opacity: 0, y: 10, scale: 0.8 }}  // 初期: 透明で下にずれた状態
            animate={{ opacity: 1, y: 0, scale: 1 }}      // 表示: 通常サイズ
            exit={{ opacity: 0 }}                         // 終了: フェードアウト
            transition={{ duration: 0.3, delay: 1 }}      // 1秒遅延して表示開始
            className="bg-white text-[10px] font-bold py-1.5 px-3 rounded-full shadow-lg border border-primary/10 text-primary whitespace-nowrap pointer-events-auto"
          >
            チャットで相談
            {/* 吹き出しの三角形部分（CSSで作成） */}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45 border-b border-r border-primary/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ボタン本体 */}
      <motion.button
        // ホバー・クリック時のアニメーション
        whileHover={{ scale: 1.05 }}  // ホバー時: 5%拡大
        whileTap={{ scale: 0.95 }}     // クリック時: 5%縮小（押した感じ）
        onClick={handleClick}
        className="bg-white p-3.5 rounded-full shadow-2xl border border-white/50 relative group pointer-events-auto"
      >
        {/* グラデーションオーバーレイ（装飾用） */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/0 rounded-full" />
        {/* Botアイコン（Lucide Reactから） */}
        <Bot className="w-7 h-7 text-primary relative z-10" />
      </motion.button>
    </div>
  );
};
