import { useEffect } from 'react';
import nanoid from 'nanoid';
import defaults from '@constants/defaults';
import getMousePosition from '@helpers/getMousePosition';

const useDrawer = ({ deskId, selectedToolShape, selectedId, shapes, dispatch }) => {
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
    dispatch({ type: 'DRAWING/HOVER', id: event.target.id });
  };

  const onMouseLeave = () => {
    dispatch({ type: 'DRAWING/HOVER', id: null });
  };

  const onClick = (event) => {
    const { target: { id } } = event;

    if (id !== deskId) {
      dispatch({ type: 'DRAWING/SELECTED', id });
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (selectedToolShape) {
      const item = createItem({
        elementType: selectedToolShape,
        itemType: 'standard',
        props: {
          onMouseEnter,
          onMouseLeave,
          ...getMousePosition(event)
        }
      });

      dispatch({ type: 'DRAWING/ADD', shape: item });
    }
  };

  // TODO: check key down event
  const onKeyDown = (event) => {
    switch (event.key) {
      case 'Backspace': {
        if (selectedId) {
          dispatch({ type: 'DRAWING/REMOVE', id: selectedId });
          dispatch({ type: 'DRAWING/SELECTED', id: null });
        }
        break;
      }
      case 'Escape': {
        dispatch({ type: 'DRAWING/SELECTED', id: null });
        break;
      }
      // no default
    }
  };

  return {
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave
  };
};

export default useDrawer;
