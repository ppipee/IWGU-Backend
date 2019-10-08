const graphql = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean
} = graphql;

const models = require('../models/')
const User = models.User;
const UserType = require('./user')
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
                fields: () => ({
                    start: { type: GraphQLString },
                    end: { type: GraphQLString }
                })
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

const PlannerType = new GraphQLObjectType({
    name: 'Planner',
    fields: () => ({
        id: { type: GraphQLID },
        userID: { type: GraphQLID },
        name: { type: GraphQLString },
        days: { type: new GraphQLList(DayPlanType) },
        author: {
            type: UserType,
            resolve(parent, args) {
                // console.log(parent)
                return User.findById(parent.userID)
            }
        },
        share: { type: GraphQLBoolean },
    }),
})

module.exports = DayPlanType