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
params: body as JSON

####body-format-example:

    {
    'shortDesc': 'shortDesc',
    'longDesc': 'longDesc',
    'prio': 1 | 2 | 3,
    'customer': customerID // eg: OpusCapita
    'service' : myService
    'assignmentgroup' : group-id* 
    }


####group-id-mapping
The values inside the request.assignmentgroup are mapped into servicenow-assignment groups:

'1': 'OC CS GLOB Service Desk AM'
'2': 'OC CS GLOB Service Desk'