import { useState, useCallback } from 'react';
import getMousePosition from '@helpers/getMousePosition';

const useDraggable = (items) => {
  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const setPosition = useCallback((event) => {
    const [selectedItem] = items.filter((item) => item.props.id === selected.id);

    if (selectedItem) {
      const { x, y } = getMousePosition(event);
      const posX = x - offset.x;
      const posY = y - offset.y;

      selectedItem.props.x = posX;
      selectedItem.props.y = posY;
    }
  }, [items, selected]);

  const onMouseDown = (event) => {
    const selectedItem = event.target;
    const className = selectedItem.getAttributeNS(null, 'class');

    if (className && className.includes('draggable')) {
      const offsetPosition = getMousePosition(event);
      offsetPosition.x -= parseFloat(selectedItem.getAttributeNS(null, 'x'));
      offsetPosition.y -= parseFloat(selectedItem.getAttributeNS(null, 'y'));

      setOffset(offsetPosition);
      setSelected(selectedItem);
    }
  };

  const onMouseUp = (event) => {
    if (selected) {
      setPosition(event);
      setSelected(null);
    }
  };

  const onMouseMove = (event) => {
    if (selected) {
      const { x, y } = getMousePosition(event);
      const posX = x - offset.x;
      const posY = y - offset.y;
      const item = selected.getAttributeNS(null, 'item');
      let xString = 'x';
      let yString = 'y';

      if (item === 'circle') {
        xString = 'cx';
        yString = 'cy';
      }

      if (posX) {
        selected.setAttributeNS(null, xString, posX);
      }
      if (posY) {
        selected.setAttributeNS(null, yString, posY);
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
