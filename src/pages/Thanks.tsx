import { useFormStore } from '../hooks/useFormStore';
import { PartyPopper, MessageCircle, Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Thanks = () => {
  const { formData } = useFormStore();

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 py-4">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner"
        >
          <PartyPopper size={48} />
        </motion.div>

        <h2 className="text-2xl font-bold text-primary">
          エントリー完了！
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          ご応募ありがとうございます。<br />
          あなたの希望に合う求人を<br />優先的にご案内します。
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        {/* LINE Button */}
        <a
          href="#"
          className="block w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-4 px-4 rounded-xl shadow-lg border-t border-white/20 text-center transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <MessageCircle size={24} fill="white" className="text-white" />
          <span>担当者にLINEで相談する（無料）</span>
        </a>

        {/* Search Jobs Button */}
        <a
          href="#"
          className="block w-full bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg border-t border-white/20 text-center transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Search size={24} />
          <span>掲載中の求人をすぐにチェック</span>
        </a>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 size={14} />
          登録情報サマリー
        </h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2 border-dashed">
            <dt className="text-gray-500">お名前</dt>
            <dd className="font-bold text-primary">{formData.name}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2 border-dashed">
            <dt className="text-gray-500">電話番号</dt>
            <dd className="font-bold text-primary">{formData.phone}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2 border-dashed">
            <dt className="text-gray-500">免許</dt>
            <dd className="font-bold text-primary text-right whitespace-pre-wrap">{formData.licenses.join(', ')}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2 border-dashed">
            <dt className="text-gray-500">働き方</dt>
            <dd className="font-bold text-primary">{formData.workStyle}</dd>
          </div>
        </dl>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-400">
          ※これはプロトタイプです。実際の求人応募は行われません。
        </p>
      </div>
    </div>
  );
};
