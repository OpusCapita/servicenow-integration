**DEPRECATED**

# servicenow-integration

## healthcheck
####basic usage
url : /api/health-check
method: GET
params: none

----------

## insert
####basic usage

url: /api/insert
method: POST
content-type: application/json
params: body as JSON

####body-format-example:

    {
    'shortdesc': 'shortDesc',
    'longdesc': 'longDesc',
    'prio': 1 | 2 | 3,
    'customer': customerID // eg: OpusCapita
    'service' : myService
    'assignmentgroup' : group-id* 
    }


####group-id-mapping
The values inside the request.assignmentgroup are mapped into servicenow-assignment groups:

`
'plattform_am': 'OC CS GLOB Service Desk AM'
'plattform': 'OC CS GLOB Service Desk'
`

#### example call via curl
`curl localhost:3016/api/insert -X POST -H 'Content-Type: application/json' -d '{   "shortdesc" : "
Kurz",   "longdesc" : "Lang",   "prio" : "5",   "customer" : "OpusCapita",   "service" : "iPost Sweden",   "assignmentgroup" : "plattform" }'`
