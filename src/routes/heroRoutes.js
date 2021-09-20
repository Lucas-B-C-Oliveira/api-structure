const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

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
                    failAction: (request, headers, error) => {
                        throw error;
                    },
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
}

module.exports = HeroRoutes