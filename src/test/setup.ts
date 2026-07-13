import "@testing-library/jest-dom";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(Element.prototype, "animate", {
  writable: true,
  value: () =>
    ({
      cancel: () => {},
      commitStyles: () => {},
      currentTime: 0,
      effect: null,
      finished: Promise.resolve(),
      id: "test-animation",
      oncancel: null,
      onfinish: null,
      onremove: null,
      pause: () => {},
      pending: false,
      persist: () => {},
      play: () => {},
      playState: "finished",
      playbackRate: 1,
      ready: Promise.resolve(),
      remove: () => {},
      replaceState: "active",
      reverse: () => {},
      startTime: 0,
      timeline: null,
      updatePlaybackRate: () => {},
    }) as unknown as Animation,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
