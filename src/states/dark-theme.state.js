import { proxy } from 'valtio/vanilla';

export const darkThemeState = loadFromLocalStorage();

export function getStoredTheme () {
  return darkThemeState.current;
}

export function updateTheme (newTheme) {
  darkThemeState.current = newTheme;
}

function loadFromLocalStorage () {
  const myList = JSON.parse(localStorage.getItem('genktv-theme'));
  if (myList) {
    return proxy(myList);
  }
  return proxy({ current: null });
}

function saveToLocalStorage () {
  localStorage.setItem('genktv-theme', JSON.stringify(darkThemeState));
}

window.addEventListener('beforeunload', () => {
  saveToLocalStorage();
});
