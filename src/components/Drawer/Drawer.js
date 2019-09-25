/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import createSVGItem from '@helpers/createSVGItem';
import createSelector from '@helpers/createSelector';

const Drawer = ({ items, state }) => {
  if (state === 'standard' || state === 'hover') {
    return (
      items.map((item) => <g key={ item.props.id }>{ createSVGItem(item) }</g>)
    );
  }
  return (
    items.map((item) => <g key={ item.props.id }>{ createSelector(item, state) }</g>)
  );
};

export default Drawer;
