import nanoid from 'nanoid';

const initialDrawingState = {
  desk: {
    id: nanoid()
  },
  tools: {
    selected: 'rect'
  },
  shapes: []
};

export default initialDrawingState;
