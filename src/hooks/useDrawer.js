import { useState, useEffect } from 'react';
import nanoid from 'nanoid';
import defaults from '@constants/defaults';
import getMousePosition from '@helpers/getMousePosition';

const useDrawer = ({ deskId, selectedShape, shapes, dispatch }) => {
  const [drawingState, setDrawingState] = useState({});

  useEffect(() => {
    return () => {
      shapes.forEach((shape) => {
        if (shape.props && shape.props.onMouseEnter) {
          window.removeEventListener('mouseenter', shape.props.onMouseEnter);
        }
        if (shape.props && shape.props.onMouseLeave) {
          window.removeEventListener('mouseleave', shape.props.onMouseLeave);
        }
      });
    };
  }, [shapes]);

  const createItem = ({ itemType, elementType, props }) => {
    const id = nanoid();

    return {
      elementType,
      props: {
        id,
        ...defaults[elementType][itemType],
        ...props
      }
    };
  };

  const onMouseEnter = (event) => {
    event.persist();
    setDrawingState((state) => ({ ...state, hoverId: event.target.id }));
  };

  const onMouseLeave = () => {
    setDrawingState((state) => ({ ...state, hoverId: null }));
  };

  const onClick = (event) => {
    const { target: { id } } = event;

    if (id !== deskId) {
      setDrawingState({ ...drawingState, selectedId: id });
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const item = createItem({
      elementType: selectedShape,
      itemType: 'standard',
      props: {
        onMouseEnter,
        onMouseLeave,
        ...getMousePosition(event)
      }
    });

    dispatch({ type: 'DRAWING/ADD', shape: item });
  };

  const onKeyDown = (event) => {
    switch (event.key) {
      case 'Backspace': {
        const { selectedId } = drawingState;
        if (selectedId) {
          dispatch({ type: 'DRAWING/REMOVE', id: selectedId });
        }
        break;
      }
      case 'Escape': {
        setDrawingState({ ...drawingState, selectedId: null });
        break;
      }
      // no default
    }
  };

  return {
    drawingState,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave
  };
};

export default useDrawer;
