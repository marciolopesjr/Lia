/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from 'ink-testing-library';
import { Corgi } from './Corgi.js';
import { vi } from 'vitest';
import { act } from '@testing-library/react';

vi.useFakeTimers();

describe('<Corgi />', () => {
  it('should animate through frames', () => {
    const { lastFrame } = render(<Corgi />);

    // Initial frame
    expect(lastFrame()).toContain('1');

    // Second frame
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(lastFrame()).toContain('2');

    // Third frame
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(lastFrame()).toContain('3');

    // Fourth frame
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(lastFrame()).toContain('Wiggle');

    // Loop back to first frame
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(lastFrame()).toContain('1');
  });
});
