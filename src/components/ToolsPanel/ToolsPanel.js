import React, { useContext } from 'react';
import { DrawingContext } from '@context/Drawing';
import useToolsPanel from '@hooks/useToolsPanel';
import defaultShapes from './shapes';
import './ToolsPanel.css';

const ToolsPanel = ({ onMouseEnter, onMouseLeave }) => {
  const [state, dispatch] = useContext(DrawingContext);
  const { selected, onShapeClick, onSaveDesk, onLoadDesk, onClearDesk } = useToolsPanel({
    state,
    dispatch,
    onMouseEnter,
    onMouseLeave,
  });

  const getShapes = () => {
    return Object.entries(defaultShapes).map(([key, value]) => (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button
        type="button"
        key={ key }
        data-item={ key }
        className={ `button icon ${ value.className } ${ key === selected && 'selected' }` }
        onClick={ onShapeClick }
      />
    ));
  };

  return (
    <div className="tools-panel">
      <div className="panel">
        <div className="title">Shapes</div>
        { getShapes() }
      </div>
      <div className="panel">
        <div className="title">Commands</div>
        <button type="button" className="button command" onClick={ onSaveDesk }>Save</button>
        <button type="button" className="button command" onClick={ onLoadDesk }>Load</button>
        <button type="button" className="button command" onClick={ onClearDesk }>Clear</button>
      </div>
    </div>
  );
};

export default ToolsPanel;
