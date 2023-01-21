
const result = document.querySelector('.result')


const fetchProducts = async () => {
    try {
        const {data} = await axios.get('/api/v1/airtable')
        const products = data.map((product) => {
            const {id, url, name, price} = product
            console.log({id, url, name, price});
            return `<a href="product.html?id=${id}" class="product">
            <img src="${url}" alt="${name}"/>
            
            <div class="info">
            <h5> ${name} </h5>
            <h5 class="price">$${price} </h5>
            </div>
               </a>
            `
        }).join('')
        result.innerHTML = products
    } catch (error) {
        result.innerHTML = '<h4> There was an error </h4>'
    }
}

fetchProducts()