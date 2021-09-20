const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, name } = request.query

                    let query = {}

                    if(name) {
                        query.name = name
                    }

                    return this.db.read(query, skip, limit)
                    
                } catch (error) {
                    console.log('It was bad', error)
                    return "Internal Server Error!!!"
                }
            }
        }
    }
}

module.exports = HeroRoutes