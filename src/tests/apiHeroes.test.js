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
            url: '/heroes'
        })
        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)

        assert.ok(Array.isArray(data))
    })
})