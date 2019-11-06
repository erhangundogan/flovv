import { useState, useCallback, useEffect } from 'react';
import getMousePosition from '@helpers/getMousePosition';

const useDraggable = (shapes) => {
  const [dragItem, setDragItem] = useState(null);
  const [resizeItem, setResizeItem] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('dragItem:', dragItem);
    console.log('resizeItem:', resizeItem);
  }, [dragItem, resizeItem]);

  const setDragPosition = useCallback((event) => {
    const [selectedItem] = shapes.filter((item) => item.props.id === dragItem.id);

    if (selectedItem) {
      const { x, y } = getMousePosition(event);
      const posX = x - offset.x;
      const posY = y - offset.y;

      selectedItem.props.x = posX;
      selectedItem.props.y = posY;
    }
  }, [shapes, dragItem]);

  const onMouseDown = (event) => {
    const selectedItem = event.target;
    const className = selectedItem.getAttributeNS(null, 'class');

    if (className) {
      if (className.includes('draggable')) {
        setResizeItem(null);
        setDragItem(selectedItem);

        const offsetPosition = getMousePosition(event);
        offsetPosition.x -= parseFloat(selectedItem.getAttributeNS(null, 'x'));
        offsetPosition.y -= parseFloat(selectedItem.getAttributeNS(null, 'y'));
        setOffset(offsetPosition);
      } else if (className.includes('resizable')) {
        setDragItem(null);

        const parentItemId = selectedItem.attributes['data-parent-id'].value;
        const resizePoint = selectedItem.attributes['data-resize'].value;
        setResizeItem(document.getElementById(parentItemId));

        const offsetPosition = getMousePosition(event);
        offsetPosition.x -= parseFloat(selectedItem.getAttributeNS(null, 'x'));
        offsetPosition.y -= parseFloat(selectedItem.getAttributeNS(null, 'y'));
        setOffset(offsetPosition);
      }
    }
  };

  const onMouseUp = (event) => {
    if (dragItem) {
      setDragPosition(event);
      setDragItem(null);
    }
  };

  const dragMove = (event) => {
    const { x, y } = getMousePosition(event);
    const posX = x - offset.x;
    const posY = y - offset.y;
    const item = dragItem.getAttributeNS(null, 'item');
    let xString = 'x';
    let yString = 'y';

    if (item === 'circle') {
      xString = 'cx';
      yString = 'cy';
    }

    if (posX) {
      dragItem.setAttributeNS(null, xString, posX);
    }
    if (posY) {
      dragItem.setAttributeNS(null, yString, posY);
    }
  };

  const resizeMove = (event) => {
    const { x, y } = getMousePosition(event);
    const posX = x - offset.x;
    const posY = y - offset.y;

    const item = resizeItem.getAttributeNS(null, 'item');

    if (item === 'rect') {
      if (posX) {
        resizeItem.setAttributeNS(null, 'width', posX);
      }
      if (posY) {
        resizeItem.setAttributeNS(null, 'height', posY);
      }
    } else if (item === 'circle') {
      if (posX) {
        resizeItem.setAttributeNS(null, 'r', posX);
      }
      if (posY) {
        resizeItem.setAttributeNS(null, 'r', posY);
      }
    }
  };

  const onMouseMove = (event) => {
    if (dragItem) {
      dragMove(event);
    } else if (resizeItem) {
      resizeMove(event);
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  };
};

export default useDraggable;
