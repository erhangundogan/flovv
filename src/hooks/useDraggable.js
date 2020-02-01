import { useState, useCallback, useEffect } from 'react';
import getMousePosition from '@helpers/getMousePosition';

const useDraggable = (shapes) => {
  const [dragItem, setDragItem] = useState(null);
  const [resizeItem, setResizeItem] = useState(null);
  const [resizePoint, setResizePoint] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   console.log('dragItem:', dragItem);
  //   console.log('resizeItem:', resizeItem);
  // }, [dragItem, resizeItem]);

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
    event.preventDefault();
    event.stopPropagation();

    const selectedItem = event.target;
    const className = selectedItem.getAttribute('class');

    if (className && className.includes('draggable')) {
      setResizeItem(null);
      setDragItem(selectedItem);

      const offsetPosition = getMousePosition(event);
      offsetPosition.x -= parseFloat(selectedItem.getAttribute('x'));
      offsetPosition.y -= parseFloat(selectedItem.getAttribute('y'));
      setOffset(offsetPosition);
    } else if (className && className.includes('resizable')) {
      setDragItem(null);
      const parentItemId = selectedItem.attributes['data-parent-id'].value;
      const currentResizePoint = selectedItem.attributes['data-resize'].value;
      if (resizeItem === null) {
        setResizeItem(document.getElementById(parentItemId));
        setResizePoint(currentResizePoint);
      } else if (parentItemId !== resizeItem.id || resizePoint !== currentResizePoint) {
        setResizeItem(document.getElementById(parentItemId));
        setResizePoint(currentResizePoint);
      }
    }
  };

  const onMouseUp = (event) => {
    if (dragItem) {
      setDragItem(null);
      setDragPosition(event);
    }
    if (resizeItem) {
      setResizeItem(null);
      setResizePoint(null);
    }
  };

  const dragMove = (event) => {
    const { x, y } = getMousePosition(event);
    const posX = x - offset.x;
    const posY = y - offset.y;
    const item = dragItem.getAttribute('item');
    let xString = 'x';
    let yString = 'y';

    if (item === 'circle') {
      xString = 'cx';
      yString = 'cy';
    }

    if (posX) {
      dragItem.setAttribute(xString, posX);
    }
    if (posY) {
      dragItem.setAttribute(yString, posY);
    }
  };

  const resizeHeight = () => {
  };

  const resizeSquare = () => {
  };

  const resizeMove = (event) => {
    // get bounding box
    const { x, y, width, height } = resizeItem.getBBox();
    const { x: posX, y: posY } = getMousePosition(event);
    const item = resizeItem.getAttribute('item');

    switch (resizePoint) {
      case 'n': {
        const diff = y - posY;
        if (diff === 0 || diff <= -height) {
          return;
        }
        if (item === 'circle') {
          const r = +resizeItem.getAttribute('r');
          resizeItem.setAttribute('r', r + diff);
          return;
        }
        resizeItem.setAttribute('height', height + diff);
        resizeItem.setAttribute('y', posY);
        return;
      }
      case 'e': {
        const diff = posX - (x + width);
        if (diff === 0 || diff <= -width) {
          return;
        }
        if (item === 'circle') {
          const r = +resizeItem.getAttribute('r');
          resizeItem.setAttribute('r', r + diff);
          return;
        }
        resizeItem.setAttribute('width', width + diff);
        return;
      }
      case 's': {
        const diff = posY - (y + height);
        if (diff === 0 || diff <= -height) {
          return;
        }
        if (item === 'circle') {
          const r = +resizeItem.getAttribute('r');
          resizeItem.setAttribute('r', r + diff);
          return;
        }
        resizeItem.setAttribute('height', height + diff);
        return;
      }
      case 'w': {
        const diff = x - posX;
        if (diff === 0 || diff <= -width) {
          return;
        }
        if (item === 'circle') {
          const r = +resizeItem.getAttribute('r');
          resizeItem.setAttribute('r', r + diff);
          return;
        }
        resizeItem.setAttribute('width', width + diff);
        resizeItem.setAttribute('x', posX);
        return;
      }
    }

    // const { x, y } = getMousePosition(event);
    // console.log('{ x, y }', x, y);
    // const posX = x - offset.x;
    // const posY = y - offset.y;
    // console.log('posX', posX);
    // console.log('posY', posY);
    //
    // const item = resizeItem.getAttribute('item');

    // if (item === 'rect') {
    //   if (posX) {
    //     resizeItem.setAttribute('width', posX);
    //   }
    //   if (posY) {
    //     resizeItem.setAttribute('height', posY);
    //   }
    // } else if (item === 'circle') {
    //   if (posX) {
    //     resizeItem.setAttribute('r', posX);
    //   }
    //   if (posY) {
    //     resizeItem.setAttribute('r', posY);
    //   }
    // }
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
