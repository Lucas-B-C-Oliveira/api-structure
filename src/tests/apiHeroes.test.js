const assert = require('assert')
const api = require('../api')
let app = {}
const MOCK_HERO_REGISTER = {
    name: 'Zeus',
    power: 'God of Olympus'
}

describe('Heroes API Test Suite', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar GET - /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })
        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('Listar GET - /heroes - should only return 10 records', async () => {
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

    it('Listar GET - /heroes - Should return an error with incorrect limit', async () => {
        const LIMIT_SIZE = "AEEE"

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT_SIZE}`
        })

        const statusCode = result.statusCode
        const errorResult = {"statusCode":400,"error":"Bad Request","message":"\"limit\" must be a number","validation":{"source":"query","keys":["limit"]}}


        assert.deepStrictEqual(statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(errorResult))

    })

    it('Listar GET - /heroes - Must filter an item', async () => {
        const NAME = "Roland-1631821487087"

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=1000&name=${NAME}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.deepStrictEqual(data[0].name, NAME)

    })

    it('Register POST - /heroes', async () => {

        const result = await app.inject({
            method: 'POST',
            url: `/heroes`,
            payload: MOCK_HERO_REGISTER
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, "Hero registered successfully!!!")

    })

})