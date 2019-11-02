const place = "https://tatapi.tourismthailand.org/tatapi/v5/places/search" //{parametor}
const details = {
    //+{placeID}
    attraction: "https://tatapi.tourismthailand.org/tatapi/v5/attraction/",
    accommodation: "https://tatapi.tourismthailand.org/tatapi/v5/accommodation/",
    restaurant: "https://tatapi.tourismthailand.org/tatapi/v5/restaurant/",
    shop: "https://tatapi.tourismthailand.org/tatapi/v5/shop/",
    other: "https://tatapi.tourismthailand.org/tatapi/v5/other/"
}

module.exports = { place, details }
