export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  };
}

export function navigateTo(destination) {  
  return {
    type: 'NAVIGATION',
    payload: destination,
  };
}

export function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
}
