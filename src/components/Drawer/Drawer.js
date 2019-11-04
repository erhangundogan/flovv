/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import createSVGItem from '@helpers/createSVGItem';

const Drawer = React.memo(({ state, items }) => {
  return (
    items.map((item) => <g key={ item.props.id }>{ createSVGItem(item) }</g>)
  );
});

export default Drawer;
