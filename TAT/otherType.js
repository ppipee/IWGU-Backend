const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} = graphql;

const SubLocationType = new GraphQLObjectType({
    name: 'SubLocation',
    fields: () => ({
        district: { type: GraphQLString },
        province: { type: GraphQLString },
    })
})

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        address: { type: GraphQLString },
        district: { type: GraphQLString },
        postcode: { type: GraphQLString },
        province: { type: GraphQLString },
        sub_district: { type: GraphQLString },
    })
})

const MapType = new GraphQLObjectType({
    name: 'Map',
    fields: () => ({
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
    })
})

const TimeType = new GraphQLObjectType({
    name: 'TimeOC',
    fields: () => ({
        open: { type: GraphQLString },
        close: { type: GraphQLString }
    })
})

const DaysType = new GraphQLObjectType({
    name: 'Day',
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

// const PaymentType = new GraphQLObjectType({
//     name: 'Pay',
//     fields: () => ({
//         code: { type: GraphQLString },
//         description: { type: GraphQLString }
//     })
// })

const ServiceType = new GraphQLObjectType({
    name: 'Service',
    fields: () => ({
        payment: { type: new GraphQLList(GraphQLString) }
    })
})

module.exports = { MapType, SubLocationType, LocationType, TimeType, DaysType, ServiceType }