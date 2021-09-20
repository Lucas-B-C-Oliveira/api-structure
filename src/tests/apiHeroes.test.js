const assert = require('assert')
const api = require('../api')
let app = {}

describe('Heroes API Test Suite', function (){
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })
        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('Listar /heroes - should only return 10 records', async () => {
        const LIMIT_SIZE = 3

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT_SIZE}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(data.length === LIMIT_SIZE)

    })

    it('Listar /heroes - Should return an error with incorrect limit', async () => {
        const LIMIT_SIZE = "AEEE"

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT_SIZE}`
        })

        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 500)

    })
    
    it('Listar /heroes - Must filter an item', async () => {
        const LIMIT_SIZE = "AEEE"
        const NAME = "Spiderman-1631821478301"

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=1000&name=${NAME}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.deepStrictEqual(data[0].name, NAME)

    })
    
})