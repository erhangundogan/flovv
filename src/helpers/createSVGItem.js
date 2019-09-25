import React from 'react';

const createSVGItem = ({ elementType, props }) => {
  switch (elementType) {
    case 'rect': {
      return (
        <rect { ...props } />
      );
    }
    // no default
  }
  return null;
};

export default createSVGItem;
