export class NearScreenController {
  constructor (host) {
    this._host = host;
    host.addController(this);
    this.isVisible = false;
    this._observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        this._observer.disconnect();
      }
      this.isVisible = isIntersecting;
      this._host.requestUpdate();
    });
  }

  hostConnected () {
    this._observer.observe(this._host);
  }
}
