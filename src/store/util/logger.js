const logger = (store) => (next) => (action) => {
  console.log(`dispatching:  "${action.type}"`);
  const result = next(action);
  return result;
};

export default logger;
