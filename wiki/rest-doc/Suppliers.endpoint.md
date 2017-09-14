# Supplier Service (supplier) API documentation version 1.0.0

---

## Suppliers
Work with `Supplier` objects.

### /api/suppliers

#### **GET**:
List of `Supplier` objects.

### Response code: 200

#### SupplierArray (application/json)

```
[{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}]
 ```

##### List of *Supplier*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| changedBy | string |  | true |  |
| changedOn | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| createdBy | string |  | true |  |
| createdOn | string |  | true |  |
| dunsNo | string |  | false |  |
| foundedOn | string |  | true |  |
| globalLocationNo | string |  | true |  |
| homePage | string |  | true |  |
| legalForm | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| supplierName | string |  | true |  |
| taxId | string |  | true |  |
| vatRegNo | string |  | false |  |

---
#### **POST**:
Adds a new supplier.

#### Supplier (application/json)
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *Supplier*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 200

#### Supplier (application/json)
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *Supplier*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 409
A supplier with the same supplierId but different set of properties already exists.

---

### /api/suppliers/{supplierId}

* **supplierId**: Identifier of a supplier.
    * Type: string

    * Required: true

#### **GET**:
Single `Supplier` object.

### Response code: 200

#### Supplier (application/json)
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *Supplier*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

---
#### **PUT**:
Updates a supplier.

#### Supplier (application/json)
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *Supplier*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 200

#### Supplier (application/json)
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *Supplier*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 403
Operation is not authorized

### Response code: 422
Inconsistent data

---

### /api/suppliers/{supplierId}/addresses

* **supplierId**: Identifier of a supplier.
    * Type: string

    * Required: true

#### **GET**:
Get all addresses assigned to the Supplier

### Response code: 200

#### SupplierAddressArray (application/json)

```
[{
  "id":"3",
  "supplierId":"hard001",
  "addressId":"central_office",
  "salutation":"Supplier",
  "name1":"Central Office",
  "name2":null,
  "name3":null,
  "areaCode":null,
  "street":"BV Borussia 09 e.V.",
  "state":null,
  "pobox":null,
  "poboxZipCode":null,
  "email":"jana.pape@jcatalog.com",
  "zipCode":"220100",
  "city":"Dortmund",
  "phoneNo":"+491234512345",
  "faxNo":null,
  "countryId":"DE",
  "changedBy":"jcadmin",
  "createdBy":"jcadmin",
  "createdOn":"2016-01-29T00:02:03.000Z",
  "changedOn":"2016-02-22T05:30:56.000Z"
}]
 ```

##### List of *SupplierAddress*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| id | string |  | true |  |
| addressId | string |  | true |  |
| supplierId | string |  | true |  |
| name1 | string |  | true |  |
| name2 | string |  | false |  |
| email | string |  | true |  |
| createdOn | string |  | true |  |
| faxNo | string |  | false |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| poboxZipCode | string |  | false |  |
| name3 | string |  | false |  |
| pobox | string |  | false |  |
| city | string |  | true |  |
| zipCode | string |  | true |  |
| salutation | string |  | true |  |
| changedBy | string |  | true |  |
| state | string |  | false |  |
| street | string |  | true |  |
| phoneNo | string |  | true |  |
| areaCode | string |  | false |  |
| countryId | string |  | true |  |
| type | string |  | true |  |

---
#### **POST**:
Insert Supplier to Address association

#### SupplierAddress (application/json)
Object representing all addresses assigned to a given supplier.

```
{
  "supplierId":"hard001",
  "addressId":"central_office",
  "type":"default",
  "salutation":"Supplier",
  "name1":"Central Office",
  "name2":null,
  "name3":null,
  "areaCode":null,
  "street":"BV Borussia 09 e.V.",
  "state":null,
  "pobox":null,
  "poboxZipCode":null,
  "email":"jana.pape@jcatalog.com",
  "zipCode":"220100",
  "city":"Dortmund",
  "phoneNo":"+491234512345",
  "faxNo":null,
  "countryId":"DE",
  "changedBy":"jcadmin",
  "createdBy":"jcadmin",
  "createdOn":"2016-01-29T00:02:03.000Z",
  "changedOn":"2016-02-22T05:30:56.000Z"
}
 ```

##### *SupplierAddress*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| addressId | string |  | true |  |
| supplierId | string |  | true |  |
| zipCode | string |  | true |  |
| name1 | string |  | true |  |
| name2 | string |  | false |  |
| email | string |  | true |  |
| createdOn | string |  | true |  |
| faxNo | string |  | false |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| poboxZipCode | string |  | false |  |
| name3 | string |  | false |  |
| pobox | string |  | false |  |
| city | string |  | true |  |
| addressId | string |  | true |  |
| salutation | string |  | true |  |
| changedBy | string |  | true |  |
| state | string |  | false |  |
| street | string |  | true |  |
| phoneNo | string |  | true |  |
| areaCode | string |  | false |  |
| countryId | string |  | true |  |
| type | string |  | true |  |

### Response code: 200

#### SupplierAddress (application/json)

```
{
  "id":"3",
  "type":"default",
  "supplierId":"hard001",
  "addressId":"central_office",
  "salutation":"Supplier",
  "name1":"Central Office",
  "name2":null,
  "name3":null,
  "areaCode":null,
  "street":"BV Borussia 09 e.V.",
  "state":null,
  "pobox":null,
  "poboxZipCode":null,
  "email":"jana.pape@jcatalog.com",
  "zipCode":"220100",
  "city":"Dortmund",
  "phoneNo":"+491234512345",
  "faxNo":null,
  "countryId":"DE",
  "changedBy":"jcadmin",
  "createdBy":"jcadmin",
  "createdOn":"2016-01-29T00:02:03.000Z",
  "changedOn":"2016-02-22T05:30:56.000Z"
}
 ```

##### *SupplierAddress* Object:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| addressId | string |  | true |  |
| supplierId | string |  | true |  |
| zipCode | string |  | true |  |
| name1 | string |  | true |  |
| name2 | string |  | false |  |
| email | string |  | true |  |
| createdOn | string |  | true |  |
| faxNo | string |  | false |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| poboxZipCode | string |  | false |  |
| name3 | string |  | false |  |
| pobox | string |  | false |  |
| city | string |  | true |  |
| addressId | string |  | true |  |
| salutation | string |  | true |  |
| changedBy | string |  | true |  |
| state | string |  | false |  |
| street | string |  | true |  |
| phoneNo | string |  | true |  |
| areaCode | string |  | false |  |
| countryId | string |  | true |  |
| type | string |  | true |  |

### Response code: 403
Operation is not authorized

### Response code: 422
Inconsistent data

---

### /api/suppliers/{supplierId}/addresses/{addressId}

* **supplierId**: Identifier of a supplier.
    * Type: string

    * Required: true

* **addressId**: Identifeir of supplier address
    * Type: number

    * Required: true

#### **PUT**:
Update Supplier to Address association

#### SupplierAddress (application/json)
Object representing all addresses assigned to a given supplier.

```
{
  "type":"default",
  "supplierId":"hard001",
  "addressId":"central_office",
  "salutation":"Supplier",
  "name1":"Central Office",
  "name2":null,
  "name3":null,
  "areaCode":null,
  "street":"BV Borussia 09 e.V.",
  "state":null,
  "pobox":null,
  "poboxZipCode":null,
  "email":"jana.pape@jcatalog.com",
  "zipCode":"220100",
  "city":"Dortmund",
  "phoneNo":"+491234512345",
  "faxNo":null,
  "countryId":"DE",
  "changedBy":"jcadmin",
  "createdBy":"jcadmin",
  "createdOn":"2016-01-29T00:02:03.000Z",
  "changedOn":"2016-02-22T05:30:56.000Z"
}
 ```

##### *SupplierAddress*:


| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| addressId | string |  | true |  |
| supplierId | string |  | true |  |
| zipCode | string |  | true |  |
| name1 | string |  | true |  |
| name2 | string |  | false |  |
| email | string |  | true |  |
| createdOn | string |  | true |  |
| faxNo | string |  | false |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| poboxZipCode | string |  | false |  |
| name3 | string |  | false |  |
| pobox | string |  | false |  |
| city | string |  | true |  |
| addressId | string |  | true |  |
| salutation | string |  | true |  |
| changedBy | string |  | true |  |
| state | string |  | false |  |
| street | string |  | true |  |
| phoneNo | string |  | true |  |
| areaCode | string |  | false |  |
| countryId | string |  | true |  |
| type | string |  | true |  |

### Response code: 200

#### SupplierAddress (application/json)

```
{
  "id":"3",
  "type":"default",
  "supplierId":"hard001",
  "addressId":"central_office",
  "salutation":"Supplier",
  "name1":"Central Office",
  "name2":null,
  "name3":null,
  "areaCode":null,
  "street":"BV Borussia 09 e.V.",
  "state":null,
  "pobox":null,
  "poboxZipCode":null,
  "email":"jana.pape@jcatalog.com",
  "zipCode":"220100",
  "city":"Dortmund",
  "phoneNo":"+491234512345",
  "faxNo":null,
  "countryId":"DE",
  "changedBy":"jcadmin",
  "createdBy":"jcadmin",
  "createdOn":"2016-01-29T00:02:03.000Z",
  "changedOn":"2016-02-22T05:30:56.000Z"
}
 ```

##### *SupplierAddress*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| addressId | string |  | true |  |
| supplierId | string |  | true |  |
| zipCode | string |  | true |  |
| name1 | string |  | true |  |
| name2 | string |  | false |  |
| email | string |  | true |  |
| createdOn | string |  | true |  |
| faxNo | string |  | false |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| poboxZipCode | string |  | false |  |
| name3 | string |  | false |  |
| pobox | string |  | false |  |
| city | string |  | true |  |
| addressId | string |  | true |  |
| salutation | string |  | true |  |
| changedBy | string |  | true |  |
| state | string |  | false |  |
| street | string |  | true |  |
| phoneNo | string |  | true |  |
| areaCode | string |  | false |  |
| countryId | string |  | true |  |
| type | string |  | true |  |

### Response code: 409
A supplier with the same supplierId but different set of properties already exists.

---

### /api/suppliers/{supplierId}/contacts

* **supplierId**: Identifier of a supplier.
    * Type: string

    * Required: true

#### **GET**:
Get all contacts assigned to the Supplier

### Response code: 200

#### SupplierContactsArray (application/json)

```
[{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}]
 ```

##### List of *SupplierConstact*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| cityOfRegistration | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

---
#### **POST**:
Insert new Contact association fro Supplier

#### SupplierConstact (application/json)
Object representing all contacts associated with a given supplier.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *SupplierConstact*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| cityOfRegistration | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 200

#### SupplierConstact (application/json)
Object representing all contacts associated with a given supplier.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *SupplierConstact*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| cityOfRegistration | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 403
Operation is not authorized

### Response code: 422
Inconsistent data

---

### /api/suppliers/{supplierId}/contacts/{contactId}

* **supplierId**: Identifier of a supplier.
    * Type: string

    * Required: true

* **contactId**: Identifier of Supplier to Contact association
    * Type: string

    * Required: true

#### **GET**:
Single `SupplierContact` object.

### Response code: 200

#### SupplierContact (application/json)
Object representing a single supplier contact item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *SupplierContact*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

---
#### **PUT**:
Update SupplierContact association body

### Response code: 200

#### SupplierConstact (application/json)
Object representing all contacts associated with a given supplier.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

##### *SupplierConstact*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| cityOfRegistration | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 409
A supplier with the same supplierId but different set of properties already exists.

---
#### **DELETE**:
Delete SupplierContact association

### Response code: 200

#### application/json (application/json)

##### *application/json*:
| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|

### Response code: 403
Operation is not authorized

### Response code: 422
Inconsistent data

---

