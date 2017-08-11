# Status API

A basic status api to track the status of things, via your API.

Run with `docker-compose up`.

# Docker 

A docker image is automatically built at [https://hub.docker.com/r/psykzz/status-api](https://hub.docker.com/r/psykzz/status-api).

# Tests
No tests currently.

# Examples

## -> GET `/api/v1/status`
 > Shows all statuses
 
### Response
```
{
  "status": "ok",
  "response": [
    {
      "_id": "598dfe0e147a53001628364f",
      "name": "test-percent",
      "type": "percent",
      "last_update": {
        "_id": "598e2ebf3b408800161f6959",
        "status": {
          "percent": "75"
        },
        "created": "2017-08-11T22:25:03.984Z"
      },
      "updated": "2017-08-11T18:57:18.678Z"
    },
    {
      "_id": "598e1c90858ea5001674decb",
      "name": "test-percent2",
      "type": "percent",
      "updated": "2017-08-11T21:07:28.246Z"
    }
  ]
}
```


## -> POST `/api/v1/status`
> Add a new status
### Request
```
{
  "name": "my-new-status",
  "type": "percent"
}
```

### Response
```
{
  "status": "ok",
  "response": {
      "__v": 0,
      "name": "my-new-status",
      "type": "percent",
      "_id": "598e3b672ccaed001626f834",
      "history": [],
      "updated": "2017-08-11T23:19:03.099Z"
  }
}
```
 
## -> GET `/api/v1/status/:statusName`
 > Shows all status details for `:statusName`
 
### Response
```
{
    "status": "ok",
    "response": {
        "_id": "598e3bf52ccaed001626f835",
        "name": "my-new-status",
        "type": "percent",
        "last_update": {
            "_id": "598e3c1a2ccaed001626f83b",
            "status": {
                "percent": 100
            },
            "created": "2017-08-11T23:22:02.036Z"
        },
        "history": [
            {
                "_id": "598e3c1a2ccaed001626f83b",
                "status": {
                    "percent": 100
                },
                "created": "2017-08-11T23:22:02.036Z"
            },
            {
                "_id": "598e3c172ccaed001626f83a",
                "status": {
                    "percent": 55
                },
                "created": "2017-08-11T23:21:59.101Z"
            },
            {
                "_id": "598e3c142ccaed001626f839",
                "status": {
                    "percent": 15
                },
                "created": "2017-08-11T23:21:56.518Z"
            },
            {
                "_id": "598e3c122ccaed001626f838",
                "status": {
                    "percent": 5
                },
                "created": "2017-08-11T23:21:54.345Z"
            },
            {
                "_id": "598e3c0d2ccaed001626f837",
                "status": {
                    "percent": 2
                },
                "created": "2017-08-11T23:21:49.457Z"
            }
        ],
        "updated": "2017-08-11T23:21:25.499Z"
    }
}
```
 
 
## -> POST `/api/v1/status/:statusName`
 > Add a new status history for `:statusName`
 ### Request
```
{
	"percent": 100
}
```

### Response
```
{
    "status": "ok",
    "response": {
        "__v": 0,
        "status": {
            "percent": 100
        },
        "parent": {
            "_id": "598e3bf52ccaed001626f835",
            "name": "my-new-status",
            "type": "percent",
            "updated": "2017-08-11T23:21:25.499Z"
        },
        "_id": "598e3c382ccaed001626f83c",
        "created": "2017-08-11T23:22:32.490Z"
    }
}
```

## -> DELETE `/api/v1/status/:statusName`
 > Remove the status `:statusName`

### Response
```
{
  "status": "ok",
  "response": null
}
```

## -> GET `/api/v1/status/:statusName/history`
 > Show all history for `:statusName`
 ### Request
```
{
    "status": "ok",
    "response": {
        "_id": "598e3bf52ccaed001626f835",
        "name": "my-new-status",
        "type": "percent",
        "history": [
            {
                "_id": "598e3c382ccaed001626f83c",
                "status": {
                    "percent": 100
                },
                "created": "2017-08-11T23:22:32.490Z"
            },
            {
                "_id": "598e3c1a2ccaed001626f83b",
                "status": {
                    "percent": 100
                },
                "created": "2017-08-11T23:22:02.036Z"
            },
            {
                "_id": "598e3c172ccaed001626f83a",
                "status": {
                    "percent": 55
                },
                "created": "2017-08-11T23:21:59.101Z"
            },
            {
                "_id": "598e3c142ccaed001626f839",
                "status": {
                    "percent": 15
                },
                "created": "2017-08-11T23:21:56.518Z"
            },
            {
                "_id": "598e3c122ccaed001626f838",
                "status": {
                    "percent": 5
                },
                "created": "2017-08-11T23:21:54.345Z"
            },
            {
                "_id": "598e3c0d2ccaed001626f837",
                "status": {
                    "percent": 2
                },
                "created": "2017-08-11T23:21:49.457Z"
            },
            {
                "_id": "598e3c0a2ccaed001626f836",
                "status": {
                    "percent": 1
                },
                "created": "2017-08-11T23:21:46.798Z"
            }
        ],
        "updated": "2017-08-11T23:21:25.499Z"
    }
}
```

### Response
```
{
  "status": "ok",
  "response": {
      "__v": 0,
      "name": "signup-api-deploy",
      "type": "percent",
      "_id": "598e3b672ccaed001626f834",
      "history": [],
      "updated": "2017-08-11T23:19:03.099Z"
  }
}
```
 
