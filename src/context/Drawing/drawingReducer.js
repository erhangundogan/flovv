const drawingReducer = (state, action) => {
  switch (action.type) {
    case 'TOOLS/SELECT': {
      return { ...state, tools: { ...state.tools, selected: action.item } };
    }
    case 'DRAWING/ADD': {
      return { ...state, shapes: [...state.shapes, action.shape] };
    }
    case 'DRAWING/REMOVE': {
      return { ...state, shapes: state.shapes.filter(({ props: { id } }) => id !== action.id) };
    }
    case 'DRAWING/REPLACE_ALL': {
      return { ...state, shapes: action.shapes };
    }
    default: {
      return state;
    }
  }
};
export default drawingReducer;
