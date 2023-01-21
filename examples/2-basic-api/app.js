
const result = document.querySelector('.result')


async function fetchData() {
  try {
    const {data} = await axios.get('/api/v1/basic-api')
    const products = data.map((product) => {
        const {image:{url}, name, price} = product

        return `<article class="product">
                    <img
                    src="${url}"

                    alt="${name}"
                    />
                    <div class="info">
                    <h5>utopia sofa</h5>
                    <h5 class="price">${price}</h5>
                    </div>
                </article>`
    }).join('')
    result.innerHTML = products
  } catch (error) {
    console.error(error.response);
  }
}


fetchData()