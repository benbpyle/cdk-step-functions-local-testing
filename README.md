### Notes and design

-   Models

-   DTOS

-   Services

-   Repositories

-   Key Interfaces

### API Authorizer

### API Definition

```
/user-profile
    - POST
    - OPTIONS
/user-profile/{id}
    - GET
    - PUT
    - OPTIONS
/user-profile/{id}/avatar
    - GET
    - PUT
    - OPTIONS
/user-profile/{id}/locations
    - GET
    - PUT
    - OPTIONS
/user-profile/{id}/locations/change-location
    - PUT
    - OPTIONS
/user-profile/{id}/roles
    - GET
    - PUT
    - OPTIONS
```

### Contract Definitions

#### UserProfile

```javascript
{
    currentTenant: int;
    emailAddress: string;
    qbosUserSharedKeyId: string;
    userId: int;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    qbosUserSharedKey: string;
}
```

#### UserRole

```javascript
{
    id: int;
    name: string;
}
```

#### UserLocation

```javascript
{
    id: string
    tenantId: number
    name: string
```
