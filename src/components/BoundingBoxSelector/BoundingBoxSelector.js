import React from 'react';
import getSelectorPoints from '@helpers/getSelectorPoints';

const BoundingBoxSelector = ({ selectedId }) => {
  const el = document.getElementById(selectedId);

  if (!el) {
    return null;
  }

  const { x, y, width, height } = el.getBBox();
  const items = getSelectorPoints({ x, y, width, height });

  return (
    <g>
      <rect className="selector" { ...{ x, y, width, height } } />
      { items.map((item) => (
        <g key={ item.cursor } style={ { cursor: item.cursor } }>
          <image
            data-parent-id={ selectedId }
            data-resize={ item.cursor.replace('-resize', '') }
            className="resizable"
            preserveAspectRatio="none"
            { ...item }
          />
        </g>
      )) }
    </g>
  );
};

export default BoundingBoxSelector;
