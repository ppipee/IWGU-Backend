const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

const PlannerType = require('./planner')
const PlaceType = require('./place')
const models = require('../models')
const Planner = models.Planner;
const Place = models.Place;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        favourite: {
            type: new GraphQLList(PlaceType),
            resolve(parent, args) {
                return parent.favourite.map(id => Place.findById(id))
            }
        },
        planner: {
            type: new GraphQLList(PlannerType),
            resolve(parent, args) {
                return Planner.find({ userID: parent.id })
            }
        },
        share: {
            type: new GraphQLList(PlannerType),
            resolve(parent, args) {
                return Planner.find({ userID: parent.id, share: true })
            }
        }
    })
});

module.exports = UserType