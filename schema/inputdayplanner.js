const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLList
} = graphql;
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');

const InputTimePlanner = new GraphQLInputObjectType({
    name: 'InputTimePlanner',
    fields: {
        start: { type: new GraphQLNonNull(GraphQLTime) },
        end: { type: new GraphQLNonNull(GraphQLTime) }
    }
})

const InputPlacePlanner = new GraphQLInputObjectType({
    name: 'InputPlace',
    fields: {
        placeID: { type: new GraphQLNonNull(GraphQLID) },
        time: { type: InputTimePlanner }
    }
})

const InputDayPlanner = new GraphQLInputObjectType({
    name: 'InputDayDetail',
    fields: {
        day: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLDate },
        note: { type: GraphQLString },
        places: { type: new GraphQLList(InputPlacePlanner) }
    }
})

module.exports = InputDayPlanner