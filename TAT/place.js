const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = graphql;
const other = require('./otherType')

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        placeID: { type: GraphQLString },
        name: { type: GraphQLString },
        category: { type: new GraphQLList(GraphQLString) },
        categoryCode: { type: GraphQLString },
        description: { type: GraphQLString },
        img: { type: new GraphQLList(GraphQLString) },
        rate: { type: GraphQLInt },
        days: { type: other.DaysType },
        time: { type: GraphQLString },
        howToTravel: { type: GraphQLString },
        service: { type: other.ServiceType },
        location: { type: other.LocationType },
        map: { type: other.MapType },
        contact: { type: other.ContactType },
    })
});

module.exports = PlaceType