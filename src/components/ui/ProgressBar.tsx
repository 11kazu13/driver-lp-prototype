/**
 * ===================================================================
 * ProgressBar.tsx
 * ===================================================================
 * 
 * 【このコンポーネントの役割】
 * フォームの進捗状況を視覚的に表示するプログレスバー
 * 「今どこにいて、あとどれくらいで終わるか」を示すことで、
 * ユーザーの不安を軽減し、フォーム離脱を防ぐ
 * 
 * 【学習ポイント】
 * - URLパスからステップ番号を計算するロジック
 * - 動的なスタイル（進捗率に応じた幅の変更）
 * - switch文による条件分岐
 */

import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// ===================================================================
// コンポーネント本体
// ===================================================================
export const ProgressBar = () => {
  // 現在のURLパスを取得
  const location = useLocation();
  const path = location.pathname;

  // -------------------------------------------------------------------
  // ステップの定義
  // -------------------------------------------------------------------
  // 各ステップのURLパスを配列で定義
  // 配列のインデックス（0, 1, 2...）がステップ番号-1に対応
  const steps = [
    '/',        // Step 1: トップページ（意欲確認）
    '/step2',   // Step 2: 免許選択
    '/step3',   // Step 3: 働き方
    '/step4',   // Step 4: 希望年収
    '/step5',   // Step 5: こだわり条件
    '/step6',   // Step 6: エリア
    '/step7',   // Step 7: 個人情報
  ];

  // -------------------------------------------------------------------
  // 現在のステップを計算
  // -------------------------------------------------------------------
  // indexOf(): 配列内で指定した値のインデックスを返す（見つからなければ-1）
  const currentIndex = steps.indexOf(path);
  const totalSteps = steps.length;

  // サンクスページや未定義のパスでは表示しない
  if (path === '/thanks') return null;
  if (currentIndex === -1) return null;

  // 1から始まるステップ番号（インデックスは0から始まるので+1）
  const currentStep = currentIndex + 1;
  // 進捗率（パーセント）を計算
  const progress = (currentStep / totalSteps) * 100;

  // -------------------------------------------------------------------
  // ステップごとのメッセージを返す関数
  // -------------------------------------------------------------------
  // switch文: 値に応じて処理を分岐
  const getStepMessage = (step: number): string => {
    switch (step) {
      case 1: return "カンタン30秒で入力完了！";   // 最初：ハードルを下げる
      case 2: return "サクサク進んでいます👍";      // 順調さをアピール
      case 3: return "その調子！折り返し地点です";   // 中だるみ防止
      case 4: return "ご希望の条件が見えてきました"; // 期待感の醸成
      case 5: return "あと少し！ラストスパート🏃‍♂️";  // ゴールを意識
      case 6: return "次が最後の項目です！";        // 終わりの明確化
      case 7: return "入力情報の最終確認";          // 安心感
      default: return "残りわずか！";
    }
  };

  // -------------------------------------------------------------------
  // JSX（見た目の定義）
  // -------------------------------------------------------------------
  return (
    <div className="w-full">
      {/* ラベル行：ステップ番号とメッセージ */}
      <div className="flex justify-between items-end px-4 py-1">
        {/* 左側：ステップ番号 */}
        <span className="text-[10px] font-bold text-white/90 tracking-wider shadow-sm">
          STEP {currentStep} <span className="text-white/60">/ {totalSteps}</span>
        </span>
        {/* 右側：励ましメッセージ */}
        <span className="text-[10px] font-bold text-accent tracking-wider drop-shadow-sm whitespace-nowrap">
          {getStepMessage(currentStep)}
        </span>
      </div>

      {/* プログレスバー本体 */}
      <div className="h-1.5 bg-gray-200/20 w-full backdrop-blur-sm">
        {/* 進捗を示すオレンジのバー */}
        <motion.div
          className="h-full bg-accent shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          // アニメーション設定
          initial={{ width: 0 }}                    // 初期: 幅0
          animate={{ width: `${progress}%` }}       // 現在: 進捗率に応じた幅
          transition={{ duration: 0.5, ease: "easeInOut" }}  // 滑らかに変化
        />
      </div>
    </div>
  );
};
