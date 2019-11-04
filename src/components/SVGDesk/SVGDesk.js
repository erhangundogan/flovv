import React from 'react';
import { Drawer } from '@components';

const SVGDesk = (
  { shapes,
    deskId,
    hoverId,
    selectedId,
    onClick,
    onKeyDown,
    onMouseDown,
    onMouseMove,
    onMouseUp }
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
        <Drawer
          state="standard"
          items={ shapes.filter(
            ({ props: { id } }) => (id !== hoverId) && (id !== selectedId),
          ) }
        />
      </g>
      <g className="hover-items" transform="translate(0.5,0.5)">
        <Drawer
          state="hover"
          items={ shapes.filter(({ props: { id } }) => (id === hoverId)) }
        />
      </g>
      <g className="selected-items" transform="translate(0.5,0.5)">
        <Drawer
          state="selected"
          items={ shapes.filter(({ props: { id } }) => (id === selectedId)) }
        />
      </g>
    </svg>
  );
};

export default SVGDesk;
