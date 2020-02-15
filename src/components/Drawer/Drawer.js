import React from 'react';
import createSVGItem from '@helpers/createSVGItem';

const Drawer = ({ items, hoverId }) => {
  return (
    items.map((item) => {
      return (
        <g key={ item.props.id } className={ hoverId === item.props.id ? 'hover-items' : '' }>
          { createSVGItem(item) }
        </g>
      );
    })
  );
};

export default Drawer;
