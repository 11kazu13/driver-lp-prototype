import { useFormStore } from '../hooks/useFormStore';

export const Thanks = () => {
  const { formData } = useFormStore();

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500 py-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-primary">
          受け付けました
        </h2>
        <p className="text-gray-600 leading-relaxed">
          ご登録ありがとうございます。<br />
          担当者より電話またはメールにて<br />詳細をご案内いたします。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">登録情報サマリー</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <dt className="text-gray-500">お名前</dt>
            <dd className="font-bold text-primary">{formData.name}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <dt className="text-gray-500">電話番号</dt>
            <dd className="font-bold text-primary">{formData.phone}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <dt className="text-gray-500">免許</dt>
            <dd className="font-bold text-primary text-right whitespace-pre-wrap">{formData.licenses.join(', ')}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
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
