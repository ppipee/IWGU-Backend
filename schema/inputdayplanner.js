const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLInt,
} = graphql;
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');

const InputTimePlanner = new GraphQLInputObjectType({
    name: 'InputTimePlanner',
    fields: {
        start: { type: new GraphQLNonNull(GraphQLTime) },
        end: { type: new GraphQLNonNull(GraphQLTime) }
    }
})

const InputPlace = new GraphQLInputObjectType({
    name: 'InputPlace',
    fields: {
        placeID: { type: new GraphQLNonNull(GraphQLString) },
        categoryCode: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }
})

const InputPlacesPlanner = new GraphQLInputObjectType({
    name: 'InputPlaces',
    fields: {
        place: { type: InputPlace },
        time: { type: InputTimePlanner }
    }
})

const InputDayPlanner = new GraphQLInputObjectType({
    name: 'InputDayDetail',
    fields: {
        day: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLDate },
        note: { type: GraphQLString },
        places: { type: new GraphQLList(InputPlacesPlanner) }
    }
})

module.exports = InputDayPlanner