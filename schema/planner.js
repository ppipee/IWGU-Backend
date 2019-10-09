const graphql = require('graphql');
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean
} = graphql;

const models = require('../models/')
const { Place, User } = models;
const PlaceType = require('./place')


const PlacePlanType = new GraphQLObjectType({
    name: 'PlacePlan',
    fields: {
        place: {
            type: PlaceType,
            resolve(parent, args) {
                return Place.findById(parent.placeID)
            }
        },
        time: {
            type: new GraphQLObjectType({
                name: 'TimeSE',
                fields: {
                    start: { type: GraphQLTime },
                    end: { type: GraphQLTime }
                }
            })
        }
    }
})

const DayPlanType = new GraphQLObjectType({
    name: 'DayPlan',
    fields: {
        day: { type: GraphQLString },
        date: { type: GraphQLDate },
        places: { type: new GraphQLList(PlacePlanType) },
        note: { type: GraphQLString }
    }
})

module.exports = DayPlanType