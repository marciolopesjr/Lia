/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';

const corgiFrames = [
  `
   / \\__
  (    @\\___
  /         O
 /   (_____/
/_____/   1
`,
  `
   / \\__
  (    @\\___
  /         O
 /   (_____/
/_____/   2
`,
  `
   / \\__
  (    @\\___
  /         O
 /   (_____/
/_____/   3
`,
  `
   / \\__
  (    @\\___
  /         O
 /   (_____/
/_____/   Wiggle
`,
];

export const Corgi = () => {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % corgiFrames.length);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Gradient name="pastel">
        <Text>{corgiFrames[frame]}</Text>
      </Gradient>
    </Box>
  );
};
