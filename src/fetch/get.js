import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
  var result = fetch(url, {
      credentials: 'include',
      mode:"cors"
  });

  return result;
}
