/**
 * ===================================================================
 * ProgressBar.test.tsx
 * ===================================================================
 * 
 * 【このテストファイルの役割】
 * ProgressBarコンポーネントが正しく表示されるかをテスト。
 * URLパスに応じてステップ番号やメッセージが変化することを検証。
 * 
 * 【学習ポイント】
 * - render: コンポーネントを仮想DOMにレンダリング
 * - screen: レンダリングされた要素を取得
 * - MemoryRouter: テスト用のルーター（URLを疑似設定）
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressBar } from '../components/ui/ProgressBar';

// -------------------------------------------------------------------
// ヘルパー関数: 特定のパスでコンポーネントをレンダリング
// -------------------------------------------------------------------
const renderWithRouter = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ProgressBar />
    </MemoryRouter>
  );
};

describe('ProgressBar', () => {
  // -------------------------------------------------------------------
  // ステップ番号の表示テスト
  // -------------------------------------------------------------------
  describe('ステップ表示', () => {
    it('Step 1（トップページ）で"STEP 1"と表示されること', () => {
      renderWithRouter('/');
      expect(screen.getByText(/STEP 1/)).toBeInTheDocument();
    });

    it('Step 3で"STEP 3"と表示されること', () => {
      renderWithRouter('/step3');
      expect(screen.getByText(/STEP 3/)).toBeInTheDocument();
    });

    it('Step 7で"STEP 7"と表示されること', () => {
      renderWithRouter('/step7');
      expect(screen.getByText(/STEP 7/)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------
  // マイクロコピー（励ましメッセージ）のテスト
  // -------------------------------------------------------------------
  describe('マイクロコピー', () => {
    it('Step 1で「カンタン30秒で入力完了！」と表示されること', () => {
      renderWithRouter('/');
      expect(screen.getByText('カンタン30秒で入力完了！')).toBeInTheDocument();
    });

    it('Step 3で「その調子！折り返し地点です」と表示されること', () => {
      renderWithRouter('/step3');
      expect(screen.getByText('その調子！折り返し地点です')).toBeInTheDocument();
    });

    it('Step 6で「次が最後の項目です！」と表示されること', () => {
      renderWithRouter('/step6');
      expect(screen.getByText('次が最後の項目です！')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------
  // 非表示条件のテスト
  // -------------------------------------------------------------------
  describe('非表示条件', () => {
    it('Thanksページでは表示されないこと', () => {
      const { container } = renderWithRouter('/thanks');
      // コンポーネントがnullを返すので、containerが空
      expect(container.firstChild).toBeNull();
    });
  });
});
