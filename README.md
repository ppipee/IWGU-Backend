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
+---id (id)
+---name (string)
+---category (list)
+---description (string)
+---img (list)
+---rate (int)
+---days (json)
|  +--monday (bool)
|  +--tuesday (bool)
|  +--wednesday (bool)
|  +--thursday (bool)
|  +--friday (bool)
|  +--saturday (bool)
|  +--sunday (bool)
+---time (json)
|  +--open (time)
|  +--close (time)
+---address (string)
+---tel (string)
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
    userPlanner(id:$id|name:$name-planner){
        planner*
    }
}
```

- Get place

```
{
    place(id:$id){
        ...
    }
}
```

- Get places

```
{
    places(null|word:$word-search){
        place*
    }
}
```

### Mutation

- Post register

```
mutation{
    register(username:$username,password:$password){
        user*
    }
}
```

- Update user data

```
mutation{
    updateUser(id:$id, | password:$password | favourite:$fav-place | planner: $planner-id ){
        user*
    }
}
```

- Post create planner

```
-
```

- Update planner

```
mutation{
    updatePlanner(id:$id, | name:$name | days:$days-list | share:$share-bool){
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
-
```
