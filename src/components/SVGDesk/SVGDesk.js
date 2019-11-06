import React from 'react';
import { Drawer, BoundingBoxSelector } from '@components';

const SVGDesk = (
  {
    shapes,
    deskId,
    hoverId,
    selectedId,
    onClick,
    onKeyDown,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  },
) => {
  return (
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
  );
};

export default SVGDesk;
