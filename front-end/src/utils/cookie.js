//
// const deleteCookie = (key) => {
//   document.cookie = `${key}=; expires= Thu, 01 Jan 1970 00:00:00 GMT`;
// };
//
// const getCookie = (key) => {
//   const cookies = document.cookie.split(';'); // '; '
//
//   for (let cookie of cookies) { // eslint-disable-line
//     //! Vinicio - cookie is going to be a string with key and value
//     const [cookieKey, cookieValue] = cookie.split('=');
//
//     if (key === cookieKey.trim()) {
//       return cookieValue;
//     }
//   }
//   return null;
// };
//
//
// export { getCookie, deleteCookie };
