class AppServer {
  private _app: string

  constructor(info: string) {
    this._app = info ?? 'Hello'
  }
}
