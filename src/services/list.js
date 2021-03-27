const getProducts = (product, offset) => {
   return fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${product}+&offset=${offset}`)
  .then(response => response.json())
  .then(data => data);
}

export default {getProducts};