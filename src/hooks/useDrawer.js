import { useState } from 'react';
import nanoid from 'nanoid';
import defaults from '@constants/defaults';
import getMousePosition from '@helpers/getMousePosition';

const useDrawer = (deskId) => {
  const [items, setItems] = useState([]);
  const [drawingState, setDrawingState] = useState({});

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
    setDrawingState((state) => ({
      ...state,
      ...{ hoverId: event.target.id }
    }));
  };

  const onMouseLeave = (event) => {
    event.persist();
    setDrawingState((state) => ({
      ...state,
      ...{ hoverId: null }
    }));
  };

  const onClick = (event) => {
    const { target: { id } } = event;

    if (id !== deskId) {
      setDrawingState((state) => ({
        ...state,
        ...{ selectedId: id }
      }));
      return;
    }

    const elementType = 'rect';
    const { x, y } = getMousePosition(event);
    const item = createItem({
      elementType,
      itemType: 'standard',
      props: {
        onMouseEnter,
        onMouseLeave,
        x,
        y
      },
    });

    setItems([...items, item]);
  };

  const onKeyDown = (event) => {
    if (event.key !== 'Backspace') {
      return;
    }
    const { selectedId } = drawingState;
    if (selectedId) {
      setItems(items.filter(({ props: { id } }) => id !== selectedId));
    }
  };

  return {
    drawingState,
    items,
    onClick,
    onKeyDown
  };
};

export default useDrawer;
