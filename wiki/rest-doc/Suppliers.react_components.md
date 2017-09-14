# Supplier Service (supplier) React Components Documentation

## Supplier Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| username | string | true | User (customer) name |
| dateTimePattern | string | true | Date format . E.g. `dd/MM/yyyy`, `MM.dd.yyyy`, etc. |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |
| onUpdate | function | false | Callback fired on supplier update `(supplier) => {}` |
| onLogout | function | false | Callback fired on logout |

### Basic Example

```
import { SupplierEditor } from 'supplier';

<SupplierEditor
  key='company'
  actionUrl='http://localhost:8080'
  supplierId='hard001'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy'
/>
```

![supplier_editor_example](https://cloud.githubusercontent.com/assets/1188617/26353550/4e52661e-3fc1-11e7-8492-964b87619599.png)

## Supplier Registration Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true | Base url of service |
| supplier | object | false | Supplier object |
| user | object | true | User object. Should contain attributes `id`, `firstName`, `lastName` and `email` |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |
| onUpdate | function | false | Callback fired on supplier create `(supplier) => {}` |
| onLogout | function | false | Callback fired on logout |

### Basic Example

```
import { SupplierRegistrationEditor } from 'supplier';

const newSupplier = {
  supplierName: 'Test AG',
  cityOfRegistration: 'Hamburg',
  countryOfRegistration: 'DE',
  taxIdentificationNo: '123-343-12',
  vatIdentificationNo: 'DE72342359',
  dunsNo: '12345',
  commercialRegisterNo: 'HRB 12873243'
};

<SupplierRegistrationEditor
  key='company'
  actionUrl='http://localhost:8080'
  supplier={newSupplier}
  user={{ id: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }}
/>
```

![supplier_registration_editor_example](https://cloud.githubusercontent.com/assets/1188617/26354132/a124a15c-3fc3-11e7-812f-eb24f527b466.png)


## Supplier Address Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false | Read only input |
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| username | string | true | User (customer) name |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |

### Basic Example

```
import { SupplierAddressEditor } from 'supplier';

<SupplierAddressEditor
  key='address'
  readOnly={false}
  actionUrl='http://localhost:8080'
  supplierId='hard001'
  username='Marlon Wayans'
/>
```

![supplier_address_editor_example](https://cloud.githubusercontent.com/assets/1188617/26353634/a8df8800-3fc1-11e7-8fc3-37fbff330805.png)

## Supplier Contact Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false | Read only input |
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |

### Basic Example

```
import { SupplierContactEditor } from 'supplier';

<SupplierContactEditor
  key='contact'
  readOnly={false}
  actionUrl='http://localhost:8080'
  supplierId='hard001'
  locale='en'
  username='Marlon Wayans'
/>
```

![supplier_contact_editor_example](https://cloud.githubusercontent.com/assets/1188617/26353707/f27a82d0-3fc1-11e7-9d2a-dec679d4f615.png)

## Supplier Profile Strength

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |

### Basic Example

```
import { SupplierProfileStrength } from 'supplier';

<SupplierProfileStrength
  key='profile_strength'
  actionUrl='http://localhost:8080'
  supplierId='hard001'
/>
```

![supplier_profile_strength_example](https://user-images.githubusercontent.com/1188617/27228558-642bc468-52a8-11e7-8b1f-7bd02165ebc0.png)
