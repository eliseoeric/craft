export const isMobileDevice = (currentWidth = null) => {
  return (currentWidth <= 769 );
}

/**
 * Prevent the body element from scrolling on iOS devices when the modal is open
 * @param {*} preventScrolling 
 */
export const stopBodyScrolling = (preventScrolling) => {
  const freezeVeiwPort = (event) => {
    event.preventDefault();
  };

  if (preventScrolling) {
    document.body.addEventListener("touchmove", freezeVeiwPort, false);
  } else {
    document.body.removeEventListener("touchmove", freezeVeiwPort, false);
  }
}

export const isBrowser = typeof window !== "undefined";