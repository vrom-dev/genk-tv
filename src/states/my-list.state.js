import { proxy } from 'valtio/vanilla';

export const myListState = loadFromLocalStorage();

export function addToMyList (element, type) {
  myListState[type].push(element);
  saveToLocalStorage();
}

export function removeFromMyList (element, type) {
  myListState[type] = myListState[type].filter(e => e.id !== element.id);
  saveToLocalStorage();
}

export function isAddedToList (element, type) {
  const isAdded = myListState[type].some(e => e.id === element.id);
  return isAdded;
}

function loadFromLocalStorage () {
  const myList = JSON.parse(localStorage.getItem('genktv-my-list'));
  if (myList) {
    return proxy(myList);
  }
  return proxy({ tv: [], movie: [] });
}

function saveToLocalStorage () {
  localStorage.setItem('genktv-my-list', JSON.stringify(myListState));
}
