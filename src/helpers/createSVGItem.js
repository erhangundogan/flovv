import React from 'react';

const createSVGItem = ({ elementType, props }) => {
  switch (elementType) {
    case 'rect': {
      return (
        <rect className="draggable" { ...props } />
      );
    }
    case 'circle': {
      return (
        <circle className="draggable" { ...props } cx={ props.x } cy={ props.y } />
      );
    }
    // no default
  }
  return null;
};

export default createSVGItem;
