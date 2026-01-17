// スマホ向けのウィザードをルーティングで制御する設計図

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MobileLayout } from './layouts/MobileLayout';
import { Step1_Motivation } from './pages/Step1_Motivation';
import { Step2_License } from './pages/Step2_License';
import { Step3_WorkStyle } from './pages/Step3_WorkStyle';
import { Step4_Salary } from './pages/Step4_Salary';
import { Step5_Conditions } from './pages/Step5_Conditions';
import { Step6_Location } from './pages/Step6_Location';
import { Step7_Entry } from './pages/Step7_Entry';
import { Thanks } from './pages/Thanks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}> {/* 親ルートと共通レイアウト */}
          <Route index element={<Step1_Motivation />} />
          <Route path="step2" element={<Step2_License />} />
          <Route path="step3" element={<Step3_WorkStyle />} />
          <Route path="step4" element={<Step4_Salary />} />
          <Route path="step5" element={<Step5_Conditions />} />
          <Route path="step6" element={<Step6_Location />} />
          <Route path="step7" element={<Step7_Entry />} />
          <Route path="thanks" element={<Thanks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
