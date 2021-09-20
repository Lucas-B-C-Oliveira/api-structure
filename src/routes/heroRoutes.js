const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, error) => {
    throw error;
}
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, name } = request.query

                    const query = {
                        name: {
                            $regex: `.*${name}*.`
                        }
                    }
                    
                    return this.db.read(name ? query: {}, skip, limit)
                    
                } catch (error) {
                    console.log('It was bad', error)
                    return "Internal Server Error!!!"
                }
            }
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().required().min(3).max(100),
                        power: Joi.string().required().min(2).max(20)

                    }
                }
            },
            handler: async (request) => {
                try {

                    const { name, power } = request.payload
                    const result = await this.db.create({ name, power })

                    return { message: "Hero registered successfully!!!", _id: result._id }
                    
                } catch (error) {
                    console.log('It was bad', error)
                    return "Internal Error!!!"
                }

            }
        }
        
    }
}

module.exports = HeroRoutes