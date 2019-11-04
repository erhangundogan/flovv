import React from 'react';

const createSelector = ({ elementType, props }) => {
  console.log('createSelector', props);
  const { x, y, r, width, height, id } = props;
  const w = width || r;
  const h = height || r;

  const xlinkHref = 'data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjUiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iIzI5YjZmMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+';
  const items = [
    { x: x - 9, y: y - 9, cursor: 'nw-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9 + w, y: y - 9, cursor: 'ne-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9 + w, y: y - 9 + h, cursor: 'se-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9, y: y - 9 + h, cursor: 'sw-resize', width: '18', height: '18', xlinkHref },
  ];
  return (
    <g id={ id } className="draggable">
      <rect className="draggable" { ...props } />
      <g className="draggable">
        <image { ...{ x, y, w, h } } preserveAspectRatio="none" />
        { items.map((item) => (
          <g className="draggable" key={ item.cursor } style={ { cursor: item.cursor } }>
            <image { ...item } preserveAspectRatio="none" />
          </g>
        )) }
      </g>
    </g>
  );
};

export default createSelector;
