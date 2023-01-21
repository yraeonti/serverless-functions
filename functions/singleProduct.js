
require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({apiKey: process.env.API_KEY})
.base(process.env.TABLE_BASE)
.table('products')

exports.handler = async (event) => {
        const { queryStringParameters: { id } } = event
        
        if (id) {

        try {

            const product = await airtable.retrieve(id)
            if (product.error) {
                return{
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                      },
                    statusCode: 404,
                    body: 'No Product'
                }
            }

            return{
                headers: {
                    'Access-Control-Allow-Origin': '*'
                  },
                statusCode: 200,
                body: JSON.stringify(product)
            }
        } catch (error) {
            return{
                headers: {
                    'Access-Control-Allow-Origin': '*'
                  },
                statusCode: 500,
                body: 'Something went wrong'
            }
        }
         
    }
    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
          },
        statusCode: 400,
        body: 'Please provide id' 
    }

   
}