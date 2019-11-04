import React, { useEffect, useReducer } from 'react';
import useDrawer from '@hooks/useDrawer';
import useDraggable from '@hooks/useDraggable';
import {
  DrawingContext,
  drawingReducer,
  initialDrawingState
} from '@context/Drawing';
import { SVGDesk, ToolsPanel } from '@components';
import './default.css';

const Desk = () => {
  const [state, dispatch] = useReducer(drawingReducer, initialDrawingState);

  // useDrawer
  const {
    drawingState, onClick, onKeyDown, onMouseEnter, onMouseLeave
  } = useDrawer({
    deskId: state.desk.id,
    selectedShape: state.tools.selected,
    shapes: state.shapes,
    dispatch
  });
  const { hoverId, selectedId } = drawingState;

  // useDraggable
  const { onMouseDown, onMouseMove, onMouseUp } = useDraggable(state.shapes);

  useEffect(() => {
    window.history.pushState('', '', `?id=${ state.desk.id }`);
  }, []);

  return (
    <>
      <DrawingContext.Provider value={ [state, dispatch] }>
        <ToolsPanel onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } />
        <SVGDesk { ...{
          shapes: state.shapes,
          deskId: state.desk.id,
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
