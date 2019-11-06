const getSelectorPoints = ({ x, y, width, height }) => {
  const xlinkHref = 'data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjUiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iIzI5YjZmMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+';
  const buttonWidth = 16;
  const buttonHeight = 16;
  const xm = x - buttonWidth / 2;
  const ym = y - buttonHeight / 2;
  const items = [
    {
      x: xm,
      y: ym,
      cursor: 'nw-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm + width / 2,
      y: ym,
      cursor: 'n-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm + width,
      y: ym,
      cursor: 'ne-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm + width,
      y: ym + height / 2,
      cursor: 'e-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm + width,
      y: ym + height,
      cursor: 'se-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm + width / 2,
      y: ym + height,
      cursor: 's-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm,
      y: ym + height,
      cursor: 'sw-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    },
    {
      x: xm,
      y: ym + height / 2,
      cursor: 'w-resize',
      width: buttonWidth,
      height: buttonHeight,
      xlinkHref
    }
  ];

  return items;
};

export default getSelectorPoints;
