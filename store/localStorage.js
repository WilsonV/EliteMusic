export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('elitemusic', serializedState);
  } catch (error) {
    console.log(error)
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('elitemusic');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
