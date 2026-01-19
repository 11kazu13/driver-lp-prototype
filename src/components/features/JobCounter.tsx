/**
 * ===================================================================
 * JobCounter.tsx
 * ===================================================================
 * 
 * 【このコンポーネントの役割】
 * 「あなたにマッチする求人数」を画面上部に常に表示するカウンター
 * 数値が動的に変化することで、ユーザーに「求人が実在する」という
 * 期待感を与え、フォーム入力へのモチベーションを高める
 * 
 * 【ポイント】
 * - Zustand（状態管理ライブラリ）からのデータ取得
 * - Framer Motionのspring（バネ）アニメーション
 * - useTransform: アニメーション値を別の値に変換
 * - 条件付きレンダリング: データの状態に応じた表示切替
 */

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useFormStore } from '../../hooks/useFormStore';
import { Sparkles, Search, CheckCircle2 } from 'lucide-react';

// ===================================================================
// コンポーネント本体
// ===================================================================
export const JobCounter = () => {
  // -------------------------------------------------------------------
  // Zustandストアからデータを取得
  // -------------------------------------------------------------------
  // useFormStore: アプリ全体で共有される状態を管理するカスタムフック
  // jobCount: 現在の求人数（nullの場合は「???」を表示）
  // formData: ユーザーが入力したフォームデータ
  const { jobCount, formData } = useFormStore();

  // -------------------------------------------------------------------
  // 入力開始の判定
  // -------------------------------------------------------------------
  // ステップ1の選択または免許選択が完了しているかをチェック
  // 入力開始前と後でメッセージを切り替えるために使用
  const hasStarted = formData.seekingStatus !== '' || formData.licenses.length > 0;

  // -------------------------------------------------------------------
  // アニメーション用のspring値を作成
  // -------------------------------------------------------------------
  // useSpring: バネのような動きをするアニメーション値を作成
  // stiffness: バネの硬さ（高いほど速く動く）
  // damping: 減衰（高いほど揺れが少ない）
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 20,
    duration: 2
  });

  // useTransform: アニメーション値を別の値に変換
  // ここでは小数点を四捨五入して整数にしている
  const display = useTransform(spring, (current) => Math.round(current));

  // -------------------------------------------------------------------
  // jobCountが変更されたらアニメーションを発火
  // -------------------------------------------------------------------
  useEffect(() => {
    if (jobCount !== null) {
      // spring.set(): 目標値を設定してアニメーション開始
      spring.set(jobCount);
    }
  }, [jobCount, spring]); // 依存配列: これらの値が変わったら再実行

  // -------------------------------------------------------------------
  // JSX（見た目の定義）
  // -------------------------------------------------------------------
  return (
    // 外側のコンテナ（パディング設定）
    <div className="px-4 pt-3 pb-1">
      {/* カード本体 */}
      <div className="bg-white rounded-xl shadow-xl p-1 relative z-20">
        <motion.div
          // マウント時のアニメーション
          initial={{ scale: 0.98, opacity: 0 }}  // 初期: 少し小さく透明
          animate={{ scale: 1, opacity: 1 }}      // 表示: 通常サイズ
          className="relative overflow-hidden bg-white border border-orange-200 border-dashed rounded-lg p-3 flex flex-col items-center justify-center transition-colors duration-500"
        >
          {/* 背景の装飾（薄い白オーバーレイ） */}
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-1">
            {/* バッジ: 入力前のみ表示 */}
            {!hasStarted ? (
              // 入力前: 好条件求人を含むことをアピール
              <div className="flex items-center gap-1.5 bg-orange-100/80 px-3 py-0.5 rounded-full border border-orange-200">
                <CheckCircle2 size={12} className="text-orange-600" />
                <span className="text-[10px] font-bold text-orange-700 tracking-wide">
                  非公開・好条件求人を含む
                </span>
              </div>
            ) : (
              // 入力後: スペースを確保（高さを維持）
              <div className="h-[22px]" />
            )}

            {/* メインの数値表示エリア */}
            <div className="flex flex-col items-center">
              {/* ラベル: 入力状態に応じて切り替え */}
              <span className="text-xs font-medium text-gray-500 mb-0.5">
                {hasStarted ? 'あなたの条件にマッチする求人' : '現在ご紹介可能な求人'}
              </span>

              <div className="flex items-baseline gap-2">
                {/* 検索アイコン（入力開始後に表示） */}
                {hasStarted && <Search className="text-orange-400 w-4 h-4" />}

                <div className="flex items-baseline">
                  {/* 求人数の表示 */}
                  {jobCount === null ? (
                    // nullの場合: 「???」を表示（検索中の演出）
                    <span className="text-3xl font-extrabold text-orange-500 tracking-wider animate-pulse">
                      ???
                    </span>
                  ) : (
                    // 数値がある場合: アニメーション付きで表示
                    <motion.span className="text-4xl font-extrabold text-orange-600 tracking-tight tabular-nums drop-shadow-sm">
                      {display}
                    </motion.span>
                  )}
                  <span className="text-sm font-bold text-orange-500 ml-1">件</span>
                </div>

                {/* キラキラアイコン（入力前のみ表示） */}
                {!hasStarted && <Sparkles className="text-orange-400 w-4 h-4 animate-pulse" />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
