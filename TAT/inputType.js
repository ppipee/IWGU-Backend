const graphql = require('graphql');
const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} = graphql;

const LocationInputType = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
        address: { type: GraphQLString },
        district: { type: GraphQLString },
        postcode: { type: GraphQLString },
        province: { type: GraphQLString },
        sub_district: { type: GraphQLString },
    })
})

const MapInputType = new GraphQLInputObjectType({
    name: 'MapInput',
    fields: () => ({
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
    })
})

const DaysInputType = new GraphQLInputObjectType({
    name: 'DayInput',
    fields: () => ({
        day1: { type: GraphQLBoolean },
        day2: { type: GraphQLBoolean },
        day3: { type: GraphQLBoolean },
        day4: { type: GraphQLBoolean },
        day5: { type: GraphQLBoolean },
        day6: { type: GraphQLBoolean },
        day7: { type: GraphQLBoolean }
    })
})

const ServiceInputType = new GraphQLInputObjectType({
    name: 'ServiceInput',
    fields: () => ({
        payment: { type: new GraphQLList(GraphQLString) }
    })
})

module.exports = { MapInputType, LocationInputType, DaysInputType, ServiceInputType }