const graphql = require('graphql');
const {
    buildSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLBoolean,
} = graphql;
const models = require('../models')
const DayPlanType = require('./planner')
const PlaceType = require('./place')
const InputDayPlanner = require('./inputdayplanner')
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');
const { User, Planner, Place } = models;

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
                return User.findById(parent.userID)
            }
        },
        share: { type: GraphQLBoolean },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        planner: {
            type: PlannerType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Planner.findById(args.id);
            }
        },
        sharePlanner: {
            type: new GraphQLList(PlannerType),
            args: { word: { type: GraphQLString } },
            resolve(parent, args) {
                if (!args)
                    return Planner.find({ share: true })
                return Planner.find({ name: args.word, share: true })
            }
        },
        userPlanner: {
            type: new GraphQLList(PlannerType),
            args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
            resolve(parent, args) {
                if (args.id)
                    return Planner.find({ userID: args.id });
                if (args.name)
                    return Planner.find({ name: args.name })
            }
        },
        place: {
            type: PlaceType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Place.findById(args.id)
            }
        },
        places: {
            type: new GraphQLList(PlaceType),
            args: { word: { type: GraphQLString } },
            resolve(parent, args) {
                if (args.word)
                    return Place.find({ name: args.word })
                return Place.find({});
            }
        }

    })
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLID) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    password: args.password
                });
                return user.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                password: { type: GraphQLString },
                favourite: { type: new GraphQLList(GraphQLString) },
                planner: { type: new GraphQLList(GraphQLString) },
            },
            resolve(parent, args) {
                let newDetail = {}
                Object.keys(args).map(key => {
                    if (args[key] && args[key] !== args.id)
                        newDetail[key] = args[key]
                })
                return User.findByIdAndUpdate(args.id, newDetail)
            }
        },
        // createPlanner: {
        //     type: PlannerType,
        //     args: {
        //         userID: { type: new GraphQLNonNull(GraphQLID) },
        //         name: { type: new GraphQLNonNull(GraphQLString) },
        //     },
        //     resolve(parent, args) {
        //         let planner = new Planner({
        //             userID: args.userID,
        //             name: args.name,
        //         })
        //         return planner.save()
        //     }
        // },
        updatePlanner: {
            type: PlannerType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                share: { type: GraphQLBoolean },
                days: { type: InputDayPlanner }
            },
            resolve(parent, args) {
                let newPlanner = {}
                Object.keys(args).map(fstLayer => {
                    if (args[fstLayer] !== args.id && args[fstLayer] !== args.days)
                        newPlanner[fstLayer] = args[fstLayer]
                })
                return Planner.findByIdAndUpdate(args.id, newPlanner)
            }
        },
        removePlanner: {
            type: PlannerType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Planner.findByIdAndDelete(args.id)
            }
        },
        // addPlace: {
        //     type: PlaceType,
        //     args: {
        //         name: { type: new GraphQLNonNull(GraphQLString) },
        //         category: { type: new GraphQLList(GraphQLString) },
        //         time: {
        //             type: new GraphQLInputObjectType({
        //                 name: 'InputTime',
        //                 fields: {
        //                     open: { type: GraphQLTime },
        //                     close: { type: GraphQLTime }
        //                 }
        //             })
        //         },
        //     },
        //     resolve(parent, args) {
        //         let place = new Place({
        //             name: args.name,
        //             category: args.category,
        //             time: {
        //                 open: args.time.open,
        //                 close: args.time.close
        //             }
        //         })
        //         return place.save()
        //     }
        // },
    }
});
module.exports = new GraphQLSchema({

    query: RootQuery,
    mutation: Mutation
});
