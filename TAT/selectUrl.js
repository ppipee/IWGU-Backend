const place = "https://tatapi.tourismthailand.org/tatapi/v3/places/search" //{parametor}
const details = {
    //+{placeID}
    attraction: "https://tatapi.tourismthailand.org/tatapi/v3/attraction/",
    accommodation: "https://tatapi.tourismthailand.org/tatapi/v3/accommodation/",
    restaurant: "https://tatapi.tourismthailand.org/tatapi/v3/restaurant/",
    shop: "https://tatapi.tourismthailand.org/tatapi/v3/shop/",
    placeOther: "https://tatapi.tourismthailand.org/tatapi/v3/other/"
}

module.exports = { place, details }
