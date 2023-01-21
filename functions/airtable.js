require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({apiKey: process.env.API_KEY})
.base(process.env.TABLE_BASE)
.table('products')
exports.handler = async (event, context) => {
   try {
    const {records} = await airtable.list()
    const products = records.map((record) => {
        const {id} = record
        const {name, image, price} = record.fields
        const url = image[0].url
        return {id, name, url, price}
    })
    return {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(products)
    }
    
   } catch (error) {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
          },
        statusCode: 500,
        body: 'Server Error'
    }
   }
}