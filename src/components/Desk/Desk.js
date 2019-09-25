import React, { useEffect } from 'react';
import queryString from 'query-string';
import useDesk from '@hooks/useDesk';
import useDrawer from '@hooks/useDrawer';
import useDraggable from '@hooks/useDraggable';
import { Drawer } from '@components';
import './default.css';

const Desk = ({ location }) => {
  const params = queryString.parse(location.search);

  const desk = useDesk(params.id);
  const {
    drawingState,
    items,
    onClick,
    onKeyDown
  } = useDrawer(desk.id);
  const {
    onMouseDown,
    onMouseMove,
    onMouseUp
  } = useDraggable(items);

  useEffect(() => {
    window.history.pushState('', '', `?id=${ desk.id }`);
  }, []);

  const { hoverId, selectedId } = drawingState;

  return (
    <svg
      id={ desk.id }
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
          items={ items.filter(
            ({ props: { id } }) => (id !== hoverId) && (id !== selectedId)
          ) }
        />
      </g>
      <g className="hover-items" transform="translate(0.5,0.5)">
        <Drawer
          state="hover"
          items={ items.filter(({ props: { id } }) => (id === hoverId)) }
        />
      </g>
      <g className="selected-items" transform="translate(0.5,0.5)">
        <Drawer
          state="selected"
          items={ items.filter(({ props: { id } }) => (id === selectedId)) }
        />
      </g>
    </svg>
  );
};

export default Desk;
