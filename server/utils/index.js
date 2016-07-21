export const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return err => {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-enable no-console */
    res.status(statusCode).send(err);
  };
};

export const handleNotFound = res => {
  return entity => {
    if (entity) {
      return entity;
    }
    res.sendStatus(404);
    return null;
  };
};
