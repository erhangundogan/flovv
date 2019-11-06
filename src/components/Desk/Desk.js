import React, { useEffect, useReducer } from 'react';
import useDrawer from '@hooks/useDrawer';
import useDraggable from '@hooks/useDraggable';
import { DrawingContext, drawingReducer, initialDrawingState } from '@context/Drawing';
import { SVGDesk, ToolsPanel } from '@components';
import './default.css';

const Desk = () => {
  const [state, dispatch] = useReducer(drawingReducer, initialDrawingState);
  const {
    desk: {
      id: deskId
    },
    tools: {
      selected: selectedToolShape
    },
    shapes,
    hoverId,
    selectedId
  } = state;

  console.log('Desk Render!');

  // useDrawer
  const {
    onClick, onKeyDown, onMouseEnter, onMouseLeave
  } = useDrawer({ deskId, selectedToolShape, selectedId, shapes, dispatch });

  // useDraggable
  const { onMouseDown, onMouseMove, onMouseUp } = useDraggable(shapes);

  useEffect(() => {
    window.history.pushState('', '', `?id=${ deskId }`);
  }, []);

  return (
    <>
      <DrawingContext.Provider value={ [state, dispatch] }>
        <ToolsPanel onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } />
        <SVGDesk { ...{
          shapes,
          deskId,
          hoverId,
          selectedId,
          onClick,
          onKeyDown,
          onMouseDown,
          onMouseMove,
          onMouseUp } }
        />
      </DrawingContext.Provider>
    </>
  );
};

export default Desk;
