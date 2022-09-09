Notes on the BC3 API integration
________________________________

# Setup

## Engine instance
For development we'll be using a dev instance of the engine set up for us by BC3. Host, username and password need to be configured using env vars:
KLAB_API_HOST
KLAB_API_USERNAME
KLAB_API_PASSWORD

## Credentials
Credentials can be obtained by self-registering at https://developers.integratedmodelling.org/modeler/#/login

# Authentication

To authenticate requests we need to obtain a token from the authentication endpoint:

```
curl --location --request POST 'https://developers.integratedmodelling.org/modeler/api/v2/users/log-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"USERNAME",
    "password":"PASSWORD"
}'
```

The response is rather long, what you need from it is the token which is under "session" key and needs to be in the 'Authorization' header for every request. Sessions are limited in time.

```
{
   "redirect":"/modeler/ui/viewer?session=s7w0zi9h1tw1",
   "session":"s7w0zi9h1tw1",
   "publicApps":[
      ...
   ],
   "authorization":"a63bcd57-a81b-4c2a-b9fe-7a34815a7d23"
}
```

# Submitting a context and observations separately

This example uses a predefined geometry of entire Colombia.

TODO: figure out about passing geometries.

```
curl --location --request POST 'https://developers.integratedmodelling.org/modeler/api/v2/public/submit/context' \
--header 'Authorization: s7w0zi9h1tw1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "urn":"aries.heco.locations.colombia_continental",
    "estimate":"false"
}'
```

It returns a response, which gives you information about status of the calculation, which is initially `OPEN`. Under the `id` key you get a ticket id that you can use to poll for the status until it becomes `RESOLVED`

```
{
   "id":"7xvf0aknfsb",
   "postDate":1662547508861,
   "resolutionDate":0,
   "status":"OPEN",
   "type":"ContextObservation",
   "data":{
      "urn":null,
      "geometry":null,
      "feasible":"true",
      "user":"...",
      "url":"/api/v2/public/submit/context",
      "email":"..."
   },
   "statusMessage":null,
   "seen":false
}
```

This is how to poll for the ticket status:

```
curl --location --request GET 'https://developers.integratedmodelling.org/modeler/api/v2/public/ticket/info/7xvf0aknfsb' \
--header 'Authorization: s7w0zi9h1tw1' \
--header 'Content-Type: application/json'
```

And this is what the response looks like when it becomes `RESOLVED`:

```
{
   "id":"7xvf0aknfsb",
   "postDate":1662547508861,
   "resolutionDate":0,
   "status":"RESOLVED",
   "type":"ContextObservation",
   "data":{
      "urn":null,
      "charge":"0.0",
      "context":"o7xvf1ernpgw",
      "actualcost":"0",
      "geometry":null,
      "feasible":"true",
      "currency":"KLB",
      "user":"...",
      "url":"/api/v2/public/submit/context",
      "email":"..."
   },
   "statusMessage":null,
   "seen":false
}
```

At which point you get the id of the context in `data -> context` and can use it to submit an observation, in this case for the biodiversity indicator:

```
curl --location --request POST 'https://developers.integratedmodelling.org/modeler/api/v2/public/submit/observation/o7xvf1ernpgw' \
--header 'Authorization: s7xvepxx8c6u' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'User-Agent: k.LAB/0.11.0 (client:klab-api)' \
--data-raw '{"urn":"im:Indicator value of ecology:Biodiversity","contextId":"o7xvf1ernpgw","estimate":false,"estimatedCost":-1,"scenarios":[],"states":{},"objects":{}}'
```

And that will again return a ticket id and a status.

```
{
   "id":"7xw2lc60itg",
   "postDate":1662549357046,
   "resolutionDate":0,
   "status":"OPEN",
   "type":"ObservationInContext",
   "data":{
      "urn":"im:Indicator value of ecology:Biodiversity",
      "feasible":"true",
      "user":"...",
      "url":"/api/v2/public/submit/observation/{context}",
      "email":"..."
   },
   "statusMessage":null,
   "seen":false
}
```

We use the same endpoint as before to poll for status and wait till it's resolved:

```
curl --location --request GET 'https://developers.integratedmodelling.org/modeler/api/v2/public/ticket/info/7xw2lc60itg' \
--header 'Authorization: s7xvepxx8c6u' \
--header 'Content-Type: application/json'
```

At this point it is possible to get the artifact id from `data -> artifacts` (which is a comma-separated list):

```
{
   "id":"7xw2lc60itg",
   "postDate":1662549357046,
   "resolutionDate":0,
   "status":"RESOLVED",
   "type":"ObservationInContext",
   "data":{
      "urn":"im:Indicator value of ecology:Biodiversity",
      "charge":"0.0",
      "actualcost":"0",
      "feasible":"true",
      "currency":"KLB",
      "user":"...",
      "url":"/api/v2/public/submit/observation/{context}",
      "email":"...",
      "artifacts":"o7xw2qgaag82"
   },
   "statusMessage":null,
   "seen":false
}
```

With the atifact id we can get the data:

```
curl --location --request GET 'https://developers.integratedmodelling.org/modeler/api/v2/public/export/structure/o7xw2qgaag82' \
--header 'Authorization: s7xvepxx8c6u' \
--header 'Content-Type: application/json'
```


```
{
   "shapeType":"EMPTY",
   "encodedShape":null,
   "spatialProjection":null,
   "id":"o7zj0v0y7bww",
   "rootContextId":"o7xvf1ernpgw",
   "label":"Indicator value of biodiversity",
   "observable":"im:Indicator (value of ecology:Biodiversity)",
   "exportLabel":"indicator_value_of_biodiversity",
   "valueType":"NUMBER",
   "observationType":"STATE",
   "semantics":[
      "VALUE",
      "QUALITY",
      "QUANTIFIABLE",
      "OBSERVABLE"
   ],
   "geometryTypes":[
      "COLORMAP",
      "RASTER"
   ],
   "literalValue":null,
   "overallValue":null,
   "traits":[
      
   ],
   "metadata":{
      "Grid size":"2488408 (1348 x 1846) cells",
      "Cell size":"1,002.65 x 1,002.355 m",
      "Temporal transitions":"Wed Jan 01 00:00:00 GMT 2020",
      "Total area":"1,139,571.998 km2"
   },
   "taskId":null,
   "contextId":"o7zj0t5le9ee",
   "empty":false,
   "style":null,
   "primary":true,
   "dataSummary":{
      "nodataProportion":0.0,
      "minValue":0.0,
      "maxValue":1.0,
      "mean":0.5749870814218037,
      "categorized":false,
      "histogram":[
         14502,
         25338,
         226145,
         116210,
         100641,
         151266,
         227539,
         274753,
         2340,
         1
      ],
      "categories":[
         "0 to 0.1",
         "0.1 to 0.2",
         "0.2 to 0.3",
         "0.3 to 0.4",
         "0.4 to 0.5",
         "0.5 to 0.6",
         "0.6 to 0.7",
         "0.7 to 0.8",
         "0.8 to 0.9",
         "0.9 to 1"
      ]
   },
   "exportFormats":[
      {
         "label":"GeoTIFF raster archive",
         "value":"tiff",
         "adapter":"raster",
         "extension":"zip"
      },
      {
         "label":"PNG image",
         "value":"png",
         "adapter":"raster",
         "extension":"png"
      }
   ],
   "originalGroupId":null,
   "alive":false,
   "main":false,
   "dynamic":false,
   "timeEvents":null,
   "histogram":{
      "bins":[
         14502,
         25338,
         226145,
         116210,
         100641,
         151266,
         227539,
         274753,
         2340,
         1
      ],
      "boundaries":[
         0.0,
         1.0
      ],
      "degenerate":false
   },
   "colormap":null,
   "childIds":{
      
   },
   "scaleReference":null,
   "childrenCount":0,
   "roles":[
      
   ],
   "observableType":null,
   "parentId":"o7zj0t5le9ee",
   "parentArtifactId":"o7zj0t5le9ee",
   "children":[
      
   ],
   "actions":[
      {
         "actionLabel":null,
         "actionId":null,
         "downloadUrl":null,
         "downloadFileExtension":null,
         "enabled":true,
         "separator":true,
         "submenu":[
            
         ]
      },
      {
         "actionLabel":"Add to cache",
         "actionId":"AddToCache",
         "downloadUrl":null,
         "downloadFileExtension":null,
         "enabled":true,
         "separator":false,
         "submenu":[
            
         ]
      }
   ],
   "structure":[
      
   ],
   "contextTime":-1,
   "creationTime":1662715757265,
   "urn":"local:observation:s7zgr0dlao5o:o7zj0v0y7bww",
   "valueCount":2488408,
   "previouslyNotified":false,
   "contextualized":true,
   "lastUpdate":1577836800000,
   "key":null
}
```

What we need from there is the `mean` value in `dataSummary`.

TODO: This sometimes returns 500, sometimes empty values, sometimes NaN. I suppose these can be either temporary or more permanent errors, so on our end we need to consider when retries are relevant for temporary errors, and when a procedure to recompute after a longer malfunction might be due.

# Submitting a context and observations at the same time

We can reduce the number of requests by submitting a context and requesting indicator observations at the same time. The request looks as follows:

```
curl --location --request POST 'https://developers.integratedmodelling.org/modeler/api/v2/public/submit/context' \
--header 'Authorization: s7xvepxx8c6u' \
--header 'Content-Type: application/json' \
--data-raw '{
    "urn":"aries.heco.locations.colombia_continental",
    "observables": [
      "im:Indicator value of ecology:Biodiversity",
      "im:Indicator value of ecology:Ecosystem for es:ClimateRegulation",
      "im:Indicator es.nca:Condition of demography:SocialStructure",
      "im:Indicator es.nca:Condition of earth:Aquatic ecology:Ecosystem"
    ],
    "estimate":"false"
}'
```

```
{
   "id":"7zifh3yl1gm",
   "postDate":1662713990951,
   "resolutionDate":0,
   "status":"OPEN",
   "type":"ContextObservation",
   "data":{
      "urn":null,
      "geometry":null,
      "feasible":"true",
      "user":"...",
      "url":"/api/v2/public/submit/context",
      "email":"..."
   },
   "statusMessage":null,
   "seen":false
}
```

The next step is identical as before, we poll the ticket endpoint until it gets RESOLVED, at which point we should have artifact ids for all 4 indicators returned in the response:

```
curl --location --request GET 'https://developers.integratedmodelling.org/modeler/api/v2/public/ticket/info/7zifh3yl1gm' --header 'Authorization: s7xvepxx8c6u' --header 'Content-Type: application/json'
```

```
{
   "id":"7zifh3yl1gm",
   "postDate":1662713990951,
   "resolutionDate":0,
   "status":"RESOLVED",
   "type":"ContextObservation",
   "data":{
      "urn":null,
      "charge":"0.0",
      "context":"o7zifh4ogcv2",
      "actualcost":"0",
      "geometry":null,
      "feasible":"true",
      "currency":"KLB",
      "user":"...",
      "url":"/api/v2/public/submit/context",
      "email":"...",
      "artifacts":"o7zifj0qqbv5,o7zigpx2di8t,o7zigq1w8la7,o7zigpx2di8t"
   },
   "statusMessage":null,
   "seen":false
}
```

TODO: why are 2 of those always identical?

And we can export each artifact separately like before.

# Running the ruby example

The simple ruby client uses the second approach of requesting observations at the same time as the context.

`Klab::Run.new.call`
