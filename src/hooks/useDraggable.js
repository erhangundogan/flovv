import { useState } from 'react';
import getMousePosition from '@helpers/getMousePosition';

const useDraggable = (items) => {
  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const setPosition = (event) => {
    if (selected) {
      const [selectedItem] = items.filter((item) => item.props.id === selected.id);

      if (selectedItem) {
        const { x, y } = getMousePosition(event);
        const posX = x - offset.x;
        const posY = y - offset.y;

        selectedItem.props.x = posX;
        selectedItem.props.y = posY;
      }
    }
  };

  const onMouseDown = (event) => {
    const selectedItem = event.target;

    const offsetPosition = getMousePosition(event);
    offsetPosition.x -= parseFloat(selectedItem.getAttributeNS(null, 'x'));
    offsetPosition.y -= parseFloat(selectedItem.getAttributeNS(null, 'y'));

    setOffset(offsetPosition);
    setSelected(selectedItem);
  };

  const onMouseUp = (event) => {
    setPosition(event);
    setSelected(null);
  };

  const onMouseMove = (event) => {
    if (selected) {
      const { x, y } = getMousePosition(event);
      const posX = x - offset.x;
      const posY = y - offset.y;

      if (posX) {
        selected.setAttributeNS(null, 'x', posX);
      }
      if (posY) {
        selected.setAttributeNS(null, 'y', posY);
      }
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  };
};

export default useDraggable;
