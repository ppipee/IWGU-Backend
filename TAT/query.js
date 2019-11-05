const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const PlaceType = require('./place')
const CardType = require('./card')
const defaultOption = require('./defaultOptions')
const link = require('./selectUrl')
const fetch = require('node-fetch')
const other = require('./otherType')
const input = require('./inputType')
const Place = require('../models/place')

const PlaceQuery = {
    places: {
        type: new GraphQLList(CardType),
        args: {
            category: { type: GraphQLString },
            keyword: { type: GraphQLString },
            geolocation: { type: GraphQLString },
            provincename: { type: GraphQLString },
            searchradius: { type: GraphQLInt },
            destination: { type: GraphQLString },
            no: { type: GraphQLInt },
        },
        resolve(parent, args) {
            let url = new URL(link.place)
            let params = args
            params.numberofresult = args.no === undefined ? 80 : args.no
            Object.keys(params).forEach(key => {
                if (params[key])
                    url.searchParams.append(key, params[key])
            })
            return fetch(url, {
                method: "GET",
                headers: defaultOption.headers
            }).then(res => res.json()).then(async (data) => {
                let new_data = []
                await Promise.all(data.result.map(async place => {
                    let url = await link.details[place.category_code.toLowerCase()] + place.place_id
                    // console.log(url, place.category_code)
                    let time = await fetch(url, {
                        method: "GET",
                        headers: defaultOption.headers
                    }).then(res => res.json()).then(data => {
                        let open_hour = data.result.opening_hours.weekday_text
                        if (open_hour)
                            Object.keys(open_hour).forEach(day => {
                                if (open_hour[day].time)
                                    return open_hour[day].time
                            })
                        // time = { open: open_hour[0].open.time, close: open_hour[0].close.time }
                        return null
                    }).catch(err => console.log("time: ", err))
                    new_data.push({
                        placeID: place.place_id,
                        name: place.place_name,
                        time: time,
                        category: place.category_description,
                        location: {
                            district: place.location.district,
                            province: place.location.province,
                        },
                        map: {
                            latitude: place.latitude,
                            longitude: place.longitude,
                        },
                        categoryCode: place.category_code,
                        thumbnail: place.thumbnail_url,
                        rate: 5
                    })
                })).catch(err => console.log(err))
                console.log(new_data)
                return new_data
            })
        }
    },
    placeDetail: {
        type: PlaceType,
        args: { placeID: { type: new GraphQLNonNull(GraphQLString) }, categoryCode: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parent, args) {
            let url = link.details[args.categoryCode.toLowerCase()] + args.placeID
            return fetch(url, {
                method: "GET",
                headers: defaultOption.headers
            }).then(res => res.json()).then(data => {
                data = data.result
                let days = {}
                let time = null
                if (data.opening_hours) {
                    let open_hour = data.opening_hours.weekday_text
                    Object.keys(open_hour).map(day => {
                        if (open_hour[day])
                            days[day] = true
                        days[day] = false
                    })
                    Object.keys(open_hour).forEach(day => {
                        if (open_hour[day])
                            time = open_hour[day].time
                    })
                }
                let category = []
                if (data.place_information[`${args.categoryCode.toLowerCase()}_types`]) {
                    data.place_information[`${args.categoryCode.toLowerCase()}_types`].forEach(tag => {
                        category = [...category, tag.description]
                    })
                }
                let payment = []
                if (data.payment_methods)
                    data.payment_methods.forEach(method => {
                        payment.push(method.description)
                    })
                return ({
                    placeID: data.place_id,
                    name: data.place_name,
                    category: category,
                    categoryCode: args.categoryCode,
                    description: data.place_information.detail,
                    img: data.mobile_picture_urls,
                    rate: 5,
                    days,
                    time,
                    howToTravel: data.how_to_travel,
                    service: {
                        payment,
                        facilities: data.facilities,
                    },
                    location: data.location,
                    map: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    contact: { ...data.contact, facebook: null, instragram: null },
                })
            }).catch(err => console.log("place detail: ", err))
        }
    }
}

const PlaceMutation = {
    addPlace: {
        type: PlaceType,
        args: {
            placeID: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            category: { type: new GraphQLList(GraphQLString) },
            description: { type: GraphQLString },
            img: { type: new GraphQLList(GraphQLString) },
            rate: { type: GraphQLInt },
            days: { type: input.DaysInputType },
            time: { type: GraphQLString },
            howToTravel: { type: GraphQLString },
            service: { type: input.ServiceInputType },
            location: { type: input.LocationInputType },
            map: { type: input.MapInputType }
        },
        resolve(parent, args) {
            let { name, category, description, img, rate, days, time, howToTravel, service, location, map } = args
            let place = new Place({
                name, category, description, img, rate, days, time, howToTravel, service, location, map
            })
            return place.save()
        }
    },
}
module.exports = { PlaceQuery, PlaceMutation }