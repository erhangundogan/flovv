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
    case 'DRAWING/HOVER': {
      return { ...state, hoverId: action.id };
    }
    case 'DRAWING/SELECTED': {
      return { ...state, selectedId: action.id };
    }
    default: {
      return state;
    }
  }
};
export default drawingReducer;
