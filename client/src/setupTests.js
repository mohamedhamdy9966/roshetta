import "@testing-library/jest-dom";

class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = window.IntersectionObserver || IntersectionObserver;
