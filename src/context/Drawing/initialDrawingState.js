import { nanoid } from 'nanoid';

const initialDrawingState = {
  desk: {
    id: nanoid()
  },
  tools: {},
  shapes: []
};

export default initialDrawingState;
