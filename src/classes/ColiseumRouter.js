class ColiseumRouter {
  constructor({
    routeName,
    expressApp,
    events,
  }) {
    this.routeName = routeName;
    this.expressApp = expressApp;

    const EMPTY_FUNCTION = () => {};

    let onDelete = EMPTY_FUNCTION;
    let onGet = EMPTY_FUNCTION;
    let onPost = EMPTY_FUNCTION;
    let onPut = EMPTY_FUNCTION;

    if (events) {
      onDelete = events.onDelete || EMPTY_FUNCTION;
      onGet = events.onGet || EMPTY_FUNCTION;
      onPost = events.onPost || EMPTY_FUNCTION;
      onPut = events.onPut || EMPTY_FUNCTION;
    }

    this.get = expressApp.get(`/${routeName}`, (req, res) => {
      onGet();
      res.sendStatus(201);
      console.log(`GET: ${routeName}`);
    });
    this.post = expressApp.post(`/${routeName}`, (req, res) => {
      onPost();
      res.sendStatus(201);
      console.log(`POST: ${routeName}`);
    });
    this.put = expressApp.put(`/${routeName}`, (req, res) => {
      onPut();
      res.sendStatus(201);
      console.log(`PUT: ${routeName}`);
    });
    this.delete = expressApp.delete(`/${routeName}`, (req, res) => {
      onDelete();
      res.sendStatus(201);
      console.log(`DELETE: ${routeName}`);
    });
  }
}

export default ColiseumRouter;
