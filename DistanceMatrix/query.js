const graphql = require('graphql');
const {
    GraphQLInputObjectType,
    GraphQLFloat,
    GraphQLList,
    GraphQLString,
} = graphql;
const distance = require('./DistanceMatrix')
const input = require('../TAT/inputType')

const DistanceQuery = {
    distances: {
        type: new GraphQLList(GraphQLString),
        args: {
            origin: { type: input.MapInputType },
            destinations: { type: new GraphQLList(input.MapInputType) }
        },
        async resolve(parent, args) {
            const origin = [args.origin.latitude.toString() + ',' + args.origin.longitude.toString()]
            const des = args.destinations.map(place => place.latitude.toString() + ',' + place.longitude.toString())
            // console.log(des)

            console.log("test2")
            return await distance(origin, des)
        }
    },
}

module.exports = DistanceQuery

