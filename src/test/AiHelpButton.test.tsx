/**
 * ===================================================================
 * AiHelpButton.test.tsx
 * ===================================================================
 * 
 * 【このテストファイルの役割】
 * AiHelpButtonコンポーネントの表示/非表示ロジックをテスト。
 * 特定のページでのみ表示されることを検証。
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AiHelpButton } from '../components/ui/AiHelpButton';

// -------------------------------------------------------------------
// ヘルパー関数
// -------------------------------------------------------------------
const renderWithRouter = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AiHelpButton />
    </MemoryRouter>
  );
};

describe('AiHelpButton', () => {
  // -------------------------------------------------------------------
  // 表示されるべきページのテスト
  // -------------------------------------------------------------------
  describe('表示条件（Step 2〜7）', () => {
    it('Step 2で表示されること', () => {
      renderWithRouter('/step2');
      expect(screen.getByText('チャットで相談')).toBeInTheDocument();
    });

    it('Step 5で表示されること', () => {
      renderWithRouter('/step5');
      expect(screen.getByText('チャットで相談')).toBeInTheDocument();
    });

    it('Step 7で表示されること', () => {
      renderWithRouter('/step7');
      expect(screen.getByText('チャットで相談')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------
  // 非表示のテスト
  // -------------------------------------------------------------------
  describe('非表示条件', () => {
    it('Step 1（トップ）では表示されないこと', () => {
      const { container } = renderWithRouter('/');
      expect(container.firstChild).toBeNull();
    });

    it('Thanksページでは表示されないこと', () => {
      const { container } = renderWithRouter('/thanks');
      expect(container.firstChild).toBeNull();
    });
  });
});
