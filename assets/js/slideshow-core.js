(function () {
  function nextIndex(current, length) {
    return length > 0 ? (current + 1) % length : 0;
  }

  function previousIndex(current, length) {
    return length > 0 ? (current - 1 + length) % length : 0;
  }

  function shouldAutoplay(state) {
    return !state.reducedMotion && !state.hovered && !state.focused && !state.paused && !state.hidden;
  }

  window.RVISlideshow = {
    nextIndex: nextIndex,
    previousIndex: previousIndex,
    shouldAutoplay: shouldAutoplay
  };
})();
