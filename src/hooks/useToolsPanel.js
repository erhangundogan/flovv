import { useState, useCallback } from 'react';
import saveDeskToStorage from '@helpers/saveDeskToStorage';
import loadDeskFromStorage from '@helpers/loadDeskFromStorage';

const useToolsPanel = ({ state, dispatch, onMouseEnter, onMouseLeave }) => {
  const [selected, setSelected] = useState(
    () => (state.tools && state.tools.selected)
  );

  const extractProps = useCallback((props) => {
    const { id, item, width, height, x, y, r } = props;
    let dimensions = {};

    if (item === 'rect') {
      dimensions = { width, height };
    } else if (item === 'circle') {
      dimensions = { r };
    }
    return { id, item, x, y, ...dimensions };
  }, []);

  const onLoadDesk = useCallback(() => {
    const loadedShapes = loadDeskFromStorage();
    if (loadedShapes) {
      const shapes = loadedShapes.map((loadedShape) => {
        const props = extractProps(loadedShape);
        return {
          elementType: props.item,
          props: {
            ...props, pointerEvents: 'all', onMouseEnter, onMouseLeave
          }
        };
      });

      dispatch({ type: 'DRAWING/REPLACE_ALL', shapes });
    }
  }, []);

  const onClearDesk = useCallback(() => {
    dispatch({ type: 'DRAWING/REPLACE_ALL', shapes: [] });
  }, []);

  const onShapeClick = useCallback((event) => {
    const item = event.target.attributes['data-item'].value;
    if (item !== selected) {
      setSelected(item);
      dispatch({ type: 'TOOLS/SELECT', item });
    }
  }, [selected]);

  const onSaveDesk = useCallback(() => {
    const items = state.shapes.map(({ props }) => extractProps(props));
    if (items.length === 0) {
      return;
    }
    saveDeskToStorage(items);
  }, [state.shapes]);

  return {
    selected,
    onShapeClick,
    onSaveDesk,
    onLoadDesk,
    onClearDesk
  };
};

export default useToolsPanel;
