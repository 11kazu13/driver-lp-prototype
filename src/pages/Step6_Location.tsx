/**
 * ===================================================================
 * Step6_Location.tsx
 * ===================================================================
 * 
 * 【このコンポーネントの役割】
 * ユーザーの位置情報（郵便番号・生年月日）を入力するステップ
 * 郵便番号入力時に住所を自動補完し、さらに「そのエリアの平均月給」を
 * 表示することで、個人情報入力への抵抗感を軽減
 * 
 * 【学習ポイント】
 * - 入力された値を受け取る（onChange）
 * - 条件で表示を切り替える（7桁なら表示する）
 * - Array.from()で年の選択肢を作る
 * - AnimatePresenceで表示・非表示に動きをつける
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, MapPin } from 'lucide-react';

// ===================================================================
// 定数の定義
// ===================================================================

// 生まれ年の選択肢を作る
// Array.from({ length: 53 }, ...): 53個分の配列を作る
// 18歳〜70歳までに相当する年を並べる
const currentYear = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 53 }, (_, i) => currentYear - 18 - i);

// -------------------------------------------------------------------
// 郵便番号から平均月給を「それっぽく」出す関数（ダミー）
// -------------------------------------------------------------------
// 実際のAPIはないので、郵便番号の先頭だけでざっくり計算する
// 【ポイント】ユーザーが嬉しくなるよう、少し高めの数値にしている
const getSalaryByZip = (zip: string): number => {
  // charAt(0): 文字列の1文字目を取り出す
  // parseInt(..., 10): 数字として読み取る
  const prefix = parseInt(zip.charAt(0), 10);

  // 地域ごとのだいたいの月給（都心ほど高め）
  // 三項演算子: 条件 ? これ : それ
  const baseRate = prefix <= 2 ? 40 : prefix <= 5 ? 38 : 35;

  // 少しだけランダムで変動させる（-2〜+3万円）
  const variation = Math.random() * 5 - 2;

  // 小数点第1位までに丸める（例: 38.5）
  return Math.round((baseRate + variation) * 10) / 10;
};

// ===================================================================
// コンポーネント本体
// ===================================================================
export const Step6_Location = () => {
  // -------------------------------------------------------------------
  // フックの定義
  // -------------------------------------------------------------------
  // useNavigate: 画面を移動するためのフック
  const navigate = useNavigate();

  // Zustandストアからフォームデータと更新関数を取得
  const { formData, setFormData, setJobCount } = useFormStore();

  // ローカルステート（この画面だけで使う状態）
  const [address, setAddress] = useState('');                    // 自動入力された住所
  const [salary, setSalary] = useState<number | null>(null);     // 表示する平均月給

  // -------------------------------------------------------------------
  // 郵便番号入力時のハンドラー
  // -------------------------------------------------------------------
  // e: 入力イベント（入力された文字などが入っている）
  // React.ChangeEvent<HTMLInputElement>: input要素のイベント型
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // replace(/\D/g, ''): 数字以外を全部消す
    // \D: 数字以外を表す正規表現
    // g: 全ての一致箇所を置換（グローバルフラグ）
    const val = e.target.value.replace(/\D/g, '');

    // Zustandストアを更新
    setFormData('zipCode', val);

    // 7桁そろったら住所と月給を表示
    if (val.length === 7) {
      setAddress('東京都新宿区西新宿'); // 本来はAPIで取得
      setSalary(getSalaryByZip(val));
    } else {
      // 7桁未満なら消す
      setAddress('');
      setSalary(null);
    }
  };

  // -------------------------------------------------------------------
  // 「次へ」ボタン押下時のハンドラー
  // -------------------------------------------------------------------
  const handleNext = () => {
    // 最終的な求人数を設定してから次へ進む
    setJobCount(3216);
    // 次のステップへ遷移
    setTimeout(() => {
      navigate('/step7');
    }, 300);
  };

  // -------------------------------------------------------------------
  // JSX（見た目の定義）
  // -------------------------------------------------------------------
  return (
    // animate-in: 画面がふわっと表示されるアニメーション
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ===== Q7: 郵便番号入力 ===== */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q7</span>
            お住まいの郵便番号
          </h2>
        </div>

        {/* 入力欄全体のカード */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          {/* 郵便番号の入力欄 */}
          <input
            type="text"
            inputMode="numeric"           // スマホで数字キーボードを出す
            pattern="\d*"                 // 数字だけ入力OK
            maxLength={7}                 // 最大7文字まで
            placeholder="1234567 (ハイフンなし)"
            className="w-full text-center text-2xl font-bold tracking-widest p-3 border-b-2 border-gray-300 focus:border-accent outline-none transition-colors rounded-none placeholder:text-gray-300 placeholder:text-lg"
            value={formData.zipCode}
            onChange={handleZipChange}     // 入力されるたびに実行
          />

          {/* 住所を自動表示（アニメーション付き） */}
          <AnimatePresence>
            {address && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}   // 最初は少し上で透明
                animate={{ opacity: 1, y: 0 }}      // 表示時は普通の位置
                exit={{ opacity: 0 }}               // 消えるときはフェードアウト
                className="text-center text-primary font-bold bg-blue-50 py-2 px-3 rounded-lg flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {address}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== サプライズ演出: 平均月給の表示 ===== */}
          {/* 住所入力の「ご褒美」として給与情報を出す */}
          <AnimatePresence>
            {salary && (
              <motion.div
                // バネっぽい動きのアニメーション
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",     // バネの動き
                  stiffness: 300,     // 硬さ
                  damping: 20,        // 収まりやすさ
                  delay: 0.3          // 0.3秒遅らせて出す
                }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center space-y-1"
              >
                {/* ラベル */}
                <div className="flex items-center justify-center gap-2 text-green-700 text-xs font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>このエリアのドライバー平均月給</span>
                </div>
                {/* 金額（大きく表示） */}
                <div className="text-3xl font-extrabold text-green-600">
                  {salary}<span className="text-lg ml-1">万円</span>
                </div>
                {/* 注意書き */}
                <p className="text-[10px] text-green-600/70">※当社調べ（2024年実績）</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== Q8: 生年月日入力 ===== */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q8</span>
            生まれ年
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* 年を選ぶセレクトボックス */}
          <select
            className="w-full p-3 text-lg bg-transparent outline-none text-center font-medium"
            value={formData.birthYear}
            onChange={(e) => setFormData('birthYear', e.target.value)}
          >
            <option value="">選択してください</option>
            {/* BIRTH_YEARSの配列を選択肢に変換 */}
            {BIRTH_YEARS.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== 次へボタン ===== */}
      {/* sticky: スクロールしても画面下に固定 */}
      <div className="pt-4 sticky bottom-4 z-10 pb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          // 両方が入るまで押せない
          disabled={!formData.zipCode || !formData.birthYear}
          className="shadow-xl"
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
};
