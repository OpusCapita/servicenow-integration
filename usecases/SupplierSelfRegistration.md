# Supplier Self Registration

#### Prerequisite 
User is registered to Business Network already and has no tenant assigned yet

## Company Registration form

User can enter company information, including name and other details that help identifiying the company.
In case of no conflicts, user can create the supplier.
This is only allowed in case user is not already assigned to a tenant to avoid tenant flooding.

Once supplier is created the user creating it is permanently assigned to this supplier by setting user.supplierId.
This ensures user can only create one tenant in registration process and also prevents user from assigning to any tenant via api.


