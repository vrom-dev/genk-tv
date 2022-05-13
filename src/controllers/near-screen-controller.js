export class NearScreenController {
  constructor (host, ref) {
    this.host = host;
    this.ref = ref;
    this.show = false;
    this.observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      console.log(entries[0]);
      if (isIntersecting) {
        this.show = true;
        host.requestUpdate();
        this.observer.disconnect();
      }
    });
    host.addController(this);
  }

  hostConnected () {
    this.observer.observe(this.host);
  }
}
