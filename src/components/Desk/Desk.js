import React, { useEffect, useReducer } from 'react';
import useDrawer from '@hooks/useDrawer';
import useDraggable from '@hooks/useDraggable';
import { DrawingContext, drawingReducer, initialDrawingState } from '@context/Drawing';
import { Drawer, BoundingBoxSelector, ToolsPanel } from '@components';
import './default.css';

const Desk = () => {
  const [state, dispatch] = useReducer(drawingReducer, initialDrawingState);
  const {
    desk: { id: deskId },
    tools: { selected: selectedToolShape },
    shapes,
    hoverId,
    selectedId
  } = state;

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
        <svg
          id={ deskId }
          onClick={ onClick }
          onKeyDown={ onKeyDown }
          onMouseDown={ onMouseDown }
          onMouseMove={ onMouseMove }
          onMouseUp={ onMouseUp }
          className="desk"
          tabIndex="0"
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="standard-items" transform="translate(0.5,0.5)">
            <Drawer state="standard" items={ shapes } hoverId={ hoverId } />
          </g>
          { selectedId && <BoundingBoxSelector selectedId={ selectedId } /> }
        </svg>
      </DrawingContext.Provider>
    </>
  );
};

export default Desk;
