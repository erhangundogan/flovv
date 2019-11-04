import { createContext } from 'react';

const DrawingContext = createContext({
  state: null,
  dispatch: null,
});

export default DrawingContext;
