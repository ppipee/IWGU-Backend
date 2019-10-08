const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = graphql;
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');

const InputTimePlanner = new GraphQLInputObjectType({
    name: 'InputTimePlanner',
    fields: {
        start: { type: GraphQLTime },
        end: { type: GraphQLTime }
    }
})

const InputPlacePlanner = new GraphQLInputObjectType({
    name: 'InputPlace',
    fields: {
        placeID: { type: GraphQLID },
        time: { type: InputTimePlanner }
    }
})

const InputDayPlanner = new GraphQLInputObjectType({
    name: 'InputDayDetail',
    fields: {
        day: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLDate },
        note: { type: GraphQLString },
        places: { type: InputPlacePlanner }
    }
})

module.exports = InputDayPlanner