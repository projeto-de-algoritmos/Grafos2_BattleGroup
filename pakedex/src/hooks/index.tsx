import React from 'react';

import { GraphProvider } from './graph';

const AppProvider: React.FC = ({ children }) => (
  <GraphProvider>{children}</GraphProvider>
);

export default AppProvider;
