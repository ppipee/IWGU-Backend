const graphql = require('graphql');
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = graphql;

const models = require('../models/')
const { User } = models;
const PlaceType = require('../TAT/place')
const defaultOption = require('../TAT/defaultOptions')
const link = require('../TAT/selectUrl')
const fetch = require('node-fetch')

const PlacePlanType = new GraphQLObjectType({
    name: 'PlacePlan',
    fields: {
        place: {
            type: PlaceType,
            resolve(parent, args) {
                let url = link.details[parent.place.categoryCode.toLowerCase()] + parent.place.placeID
                let name = fetch(url, {
                    method: "GET",
                    headers: defaultOption.headers
                }).then(res => res.json()).then(data => data.result.place_name).catch(err => console.log("place plan: ", err))
                console.log(parent.place)
                return { name, categoryCode: parent.place.categoryCode.toLowerCase(), placeID: parent.place.placeID }
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
        day: { type: GraphQLInt },
        date: { type: GraphQLDate },
        places: { type: new GraphQLList(PlacePlanType) },
        note: { type: GraphQLString }
    }
})

module.exports = DayPlanType