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
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');
const models = require('../models')
const DayPlanType = require('./planner')
const PlaceType = require('../TAT/place')
const CardType = require('../TAT/card')
const InputDayPlanner = require('./inputdayplanner')
const { User, Planner } = models;
const PlaceTAT = require('../TAT/query')
const defaultOption = require('../TAT/defaultOptions')
const link = require('../TAT/selectUrl')
const fetch = require('node-fetch')
const mongoose = require('mongoose')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLID },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        favourite: {
            type: new GraphQLList(CardType),
            async resolve(parent, args) {
                let fav = []
                await Promise.all(Object.keys(parent.favourite).map(async (place) => {
                    let code = parent.favourite[place].categoryCode
                    let url = link.details[parent.favourite[place].categoryCode] + parent.favourite[place].placeID
                    let data = await fetch(url, {
                        method: "GET",
                        headers: defaultOption.headers
                    }).then(res => res.json()).then(data => {
                        const place = data.result
                        return {
                            placeID: place.place_id,
                            name: place.place_name,
                            // category: place.category_description,
                            location: {
                                district: place.location.district,
                                province: place.location.province,
                            },
                            categoryCode: code,
                            thumbnail: place.thumbnail_url,
                            rate: 5
                        }
                    }).catch(err => console.log("fav: ", err))
                    fav.push(data)
                }))
                return fav
            }
        },
        draft: {
            type: new GraphQLList(CardType),
            async resolve(parent, args) {
                let fav = []
                await Promise.all(Object.keys(parent.draft).map(async (place) => {
                    let code = parent.draft[place].categoryCode
                    let url = link.details[parent.draft[place].categoryCode] + parent.draft[place].placeID
                    let data = await fetch(url, {
                        method: "GET",
                        headers: defaultOption.headers
                    }).then(res => res.json()).then(data => {
                        const place = data.result
                        return {
                            placeID: place.place_id,
                            name: place.place_name,
                            categoryCode: code,
                        }
                    }).catch(err => console.log("draft: ", err))
                    fav.push(data)
                }))
                return fav
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

const InputFavType = new GraphQLInputObjectType({
    name: 'InputFav',
    fields: () => ({
        placeID: { type: new GraphQLNonNull(GraphQLString) },
        categoryCode: { type: new GraphQLNonNull(GraphQLString) },
    })
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
            args: {
                id: { type: GraphQLID }, username: { type: GraphQLID }
            },
            resolve(parent, args) {
                if (args.id)
                    return User.findById(args.id);
                if (args.username)
                    return User.findOne({ username: args.username });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        authSignin: {
            type: GraphQLBoolean,
            args: {
                username: { type: new GraphQLNonNull(GraphQLID) }, password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return User.findOne({ username: args.username }).then(data => {
                    if (data === null)
                        return false
                    return data.password === args.password
                }).catch(err => false)
            }
        },
        authRegister: {
            type: GraphQLBoolean,
            args: {
                username: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return User.findOne({ username: args.username }).then(data => {
                    return data === null ? true : false
                }).catch(err => false)
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
                    return Planner.find({ name: args.name });
            }
        },
        authPlanner: {
            type: GraphQLString,
            args: {
                plannerID: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Planner.findById(args.plannerID).then(data => {
                    if (data === null) {
                        return "notfound"
                    }
                    return data.share ? "access" : "notaccess"
                }).catch(err => "error")
            }
        },
        checkCreatePlanner: {
            type: GraphQLBoolean,
            args: {
                userID: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Planner.find({ userID: args.userID }).then(async data => {
                    if (data === null) {
                        return false
                    }
                    const user = await User.findById(args.userID)
                    if (user.status === "traveler")
                        return data.length >= 5 ? false : true
                    return true
                }).catch(err => false)
            }
        },
        checkCreateDay: {
            type: GraphQLBoolean,
            args: {
                plannerID: { type: new GraphQLNonNull(GraphQLID) },
                userID: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Planner.findById(args.plannerID).then(async data => {
                    if (data === null) {
                        return false
                    }
                    const user = await User.findById(args.userID)
                    if (user.status === "traveler")
                        return data.days.length >= 7 ? false : true
                    return true
                }).catch(err => false)
            }
        },
        ...PlaceTAT.PlaceQuery
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
                    password: args.password,
                    name: args.username,
                    status: "traveler",
                });
                console.log(user)
                return user.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                password: { type: GraphQLString },
                name: { type: GraphQLString },
                status: { type: GraphQLString },
                favourite: { type: new GraphQLList(InputFavType) },
                draft: { type: new GraphQLList(InputFavType) },
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
        createPlanner: {
            type: PlannerType,
            args: {
                userID: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                share: { type: GraphQLBoolean },
                days: { type: new GraphQLList(InputDayPlanner) }
            },
            resolve(parent, args) {
                let planner = new Planner({
                    userID: args.userID,
                    name: args.name,
                    days: args.days,
                })
                planner.share = planner.share ? planner.share : false
                return planner.save()
            }
        },
        updatePlanner: {
            type: PlannerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                share: { type: GraphQLBoolean },
                days: { type: new GraphQLList(InputDayPlanner) }
            },
            resolve(parent, args) {
                let newPlanner = {}
                Object.keys(args).map(fstLayer => {
                    if (args[fstLayer] !== args.id)
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
        ...PlaceTAT.PlaceMutation
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
