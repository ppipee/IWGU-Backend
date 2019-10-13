const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = graphql;
const other = require('./otherType')


const CardType = new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        placeID: { type: GraphQLString },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        categoryCode: { type: GraphQLString },
        time: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        rate: { type: GraphQLInt },
        map: { type: other.MapType },
        location: { type: other.SubLocationType },
    })
})

module.exports = CardType