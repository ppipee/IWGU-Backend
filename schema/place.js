const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = graphql;
const { GraphQLTime } = require('graphql-iso-date');

const DaysType = new GraphQLObjectType({
    name: 'Day',
    fields: () => ({
        monday: { type: GraphQLBoolean },
        tuesday: { type: GraphQLBoolean },
        wednesday: { type: GraphQLBoolean },
        thursday: { type: GraphQLBoolean },
        friday: { type: GraphQLBoolean },
        saturday: { type: GraphQLBoolean },
        sunday: { type: GraphQLBoolean }
    })
})

const TimeType = new GraphQLObjectType({
    name: 'TimeOC',
    fields: () => ({
        open: { type: GraphQLTime },
        close: { type: GraphQLTime }
    })
})

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: new GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
        img: { type: new GraphQLList(GraphQLString) },
        rate: { type: GraphQLInt },
        days: { type: DaysType },
        time: { type: TimeType },
        address: { type: GraphQLString },
        tel: { type: GraphQLString }
    })
});

module.exports = PlaceType