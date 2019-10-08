# IWGU-Backend

## Programming Language , Framework, Library

- ExpressJS (server)
- GraphQL (query api)
- MongooseDB (database)
- Heroku (deploy)

### Model

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
