# IWGU-Backend

### Programming Language , Framework, Library

- ExpressJS (server)
- GraphQL (query api)
- MongooseDB (database)
- Heroku (deploy)

### Schema

- user

```
user
+---id (id)
+---username (id)
+---password (string)
+---favourite (list)
+---planner (list)
+---share (list)
```

- planner

```
planner
+---id (id)
+---userID (id)
+---author (json)
|  +--user*
+---name (string)
+---days (list)
|  +--day (int)
|  +--date (date)
|  +--places (list)
|  | +--place*
|  | +--time (json)
|  |   +--start (time)
|  |   +--end (time)
|  +--note (string)
+---share (bool)
```

- place

```
place
+---placeID (string)
+---name (string)
+---category (list)
+---description (string)
+---img (list)
+---rate (int)
+---days (json)
|  +--day1 (bool)
|  +--day2 (bool)
|  +--day3 (bool)
|  +--day4 (bool)
|  +--day5 (bool)
|  +--day6 (bool)
|  +--day7 (bool)
+---time (string) (open-close)
+---howToTravel (string)
+---contact (json)
|  +--phones (list)
|  +--mobiles (list)
|  +--emails (list)
|  +--urls (list)
+---service (json)
|  +--payment (list)
|  +--facilities (json)
|    +-code
|    +-description
+---location (json)
|  +--address
|  +--district
|  +--sub_districe
|  +--province
|  +--postcode
+---map (json)
|  +--latitude (float)
|  +--lontitude (float)

```

### Format

- Date year-month-day
- Time 14:00:00+07:00

### Query

- Get user

```
{
    user(id:$id){
        ...
    }
}
```

- Get all users

```
{
    users{
        user*
    }
}
```

- Get planner

```
{
    planner(id:$id){
        ...
    }
}
```

- Get share planners

```
{
    sharePlanner{
        planner*
    }
}
```

- Get user planners (for admin)

```
{
    userPlanner(id:$id|name:$string){
        planner*
    }
}
```

- Get places

```
{
    places(category:$string|keyword:$string|provincename:$string|(geolocation:$string & searchradius:$int)|destination:$string){
        placeID,
        name,
        time,
        category,
        location{
            district,
            province
        },
        map{
            latitude,
            longitude,
        },
        categoryCode,
        thumbnail,
        rate,
    }
}
```

- Get place detail

```
{
    placeDetail(null|(placeID:$string & categoryCode:$string)){
        place*
    }
}
```

### Mutation

- Post register

```
mutation{
    register(username:$string,password:$string){
        user*
    }
}
```

- Update user data

```
mutation{
    updateUser(id:$id, | password:$password | favourite:[$id] | planner: [$id] ){
        user*
    }
}
```

- Post create planner

```
mutation{
    createPlanner(userID:$id,name:$string,share:true ($bool),days:[$days]){
        planner*
    }
}

```

- Update planner

```
mutation{
    updatePlanner(id:$id, | name:$string | days:[$days] | share:$bool){
        planner*
    }
}
```

- Delete planner

```
mutation{
    removePlanner(id:$id){
        planner*
    }
}
```

- Post place

```
    Comming Soon
```
