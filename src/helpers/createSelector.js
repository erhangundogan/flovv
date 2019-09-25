import React from 'react';

const createSelector = ({ elementType, props }) => {
  const { x, y, width, height } = props;
  const xlinkHref = 'data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjUiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iIzI5YjZmMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+';
  const items = [
    { x: x - 9, y: y - 9, cursor: 'nw-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9 + width, y: y - 9, cursor: 'ne-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9 + width, y: y - 9 + height, cursor: 'se-resize', width: '18', height: '18', xlinkHref },
    { x: x - 9, y: y - 9 + height, cursor: 'sw-resize', width: '18', height: '18', xlinkHref },
  ];
  return (
    <g>
      <rect { ...props } />
      <image { ...{ x, y, width, height } } preserveAspectRatio="none" />
      { items.map((item) => (
        <g key={ item.cursor } style={ { cursor: item.cursor } }>
          <image { ...item } preserveAspectRatio="none" />
        </g>
      )) }
    </g>
  );
};

export default createSelector;
