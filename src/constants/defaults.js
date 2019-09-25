const defaults = {
  rect: {
    standard: {
      pointerEvents: 'all',
      width: 80,
      height: 40,
      draggable: true
    },
    hover: {
      pointerEvents: 'none',
      draggable: true
    },
    selected: {
      pointerEvents: 'none',
      draggable: true
    }
  },
  grid: {
    size: 10
  }
};

export default defaults;
