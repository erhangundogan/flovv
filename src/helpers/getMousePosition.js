import defaults from '@constants/defaults';

const getMousePosition = (event) => {
  const svg = event.currentTarget;
  const pt = svg.createSVGPoint();
  const gridSize = defaults.grid.size;

  pt.x = event.clientX;
  pt.y = event.clientY;

  const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());

  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize
  };
};

export default getMousePosition;
