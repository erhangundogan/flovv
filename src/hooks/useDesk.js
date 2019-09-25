import nanoid from 'nanoid';

let desks = {};

const getNewDesk = (id) => ({ [id]: { id, options: {}, nodes: [] } });

const useDesk = (id = null) => {
  if (id && (id !== 'undefined' && id !== 'null')) {
    if (Object.keys(desks).includes(id)) {
      return desks[id];
    }
    const newDesk = getNewDesk(id);
    desks = { ...desks, ...newDesk };
    return desks[id];
  }

  const newId = nanoid();
  const newDesk = getNewDesk(newId);
  desks = { ...desks, ...newDesk };
  return desks[newId];
};

export default useDesk;
