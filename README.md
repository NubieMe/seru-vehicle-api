# Vehicle API

## User API

### Register

-   Method : `POST`
-   Endpoint : `/api/register`
-   Request Body :

```json
{
    "name": "admin",
    "password": "admin"
}
```

-   Response Body :

```json
{
    "message": "Register success",
    "data": {
        "token": "uy876ttfghuhy7r5"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "name already registered"
}
```

### Login

-   Method : `POST`
-   Endpoint : `/api/login`
-   Request Body :

```json
{
    "name": "admin",
    "password": "admin"
}
```

-   Response Body :

````json
{
    "message": "Login Success",
    "data": {
        "token": "juy7t67tfhgvnbn"
    }
}

- Response Body (Failed) :
```json
{
    "errors": "name/password is invalid"
}
````

## Vehicle Brand API

### Create Brand

-   Method : `POST`
-   Endpoint : `/api/brand`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Body :

```json
{
    "name": "BMW"
}
```

-   Response Body :

```json
{
    "message": "vehicle brand created",
    "data": {
        "id": 1,
        "name": "BMW"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "brand name already exists"
}
```

### Get All Brand

-   Method : `GET`
-   Endpoint : `/api/brand`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Body :

```json
{
    "message": "get vehicle brand success",
    "data": [
        {
            "id": 1,
            "name": "BMW"
        },
        {
            "id": 2,
            "name": "Porsche"
        },
        . . .
    ],
    "metadata": {
        "total": 20,
        "limit": 5,
        "offset": 0,
        "current_page": 1,
        "total_pages": 4
    }
}
```

### Get Brand By ID

-   Method : `GET`
-   Endpoint : `/api/brand/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "get vehicle brand success",
    "data": {
        "id": 1,
        "name": "BMW"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "brand not found"
}
```

### Update Brand

-   Method : `PUT`
-   Endpoint : `/api/brand/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Request Body :

```json
{
    "name": "BMX"
}
```

-   Response Body :

```json
{
    "message": "update brand success",
    "data": {
        "id": 1,
        "name": "BMX"
    }
}
```

### Delete Brand

-   Method : `DELETE`
-   Endpoint : `/api/brand/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "delete brand success",
    "data": {
        "id": 1,
        "name": "BMW"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "brand not found"
}
```

## Vehicle Type API

### Create Type

-   Method : `POST`
-   Endpoint : `/api/type`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Body :

```json
{
    "name": "SUV",
    "brand_id": 1
}
```

-   Response Body :

```json
{
    "message": "create type success",
    "data": {
        "id": 1,
        "name": "SUV",
        "brand": "BMW"
    }
}
```

### Get All Type

-   Method : `GET`
-   Endpoint : `/api/type`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Body :

```json
{
    "message": "get type success",
    "data": [
        {
            "id": 1,
            "name": "SUV",
            "brand": "BMW"
        },
        {
            "id": 2,
            "name": "Sedan",
            "brand": "BMW"
        },
        . . .
    ],
    "metadata": {
        "total": 20,
        "limit": 5,
        "offset": 0,
        "current_page": 1,
        "total_pages": 4
    }
}
```

### Get Type By ID

-   Method : `GET`
-   Endpoint : `/api/type/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Param : `id` = `1`
-   Response Body :

```json
{
    "message": "get type success",
    "data": {
        "id": 1,
        "name": "SUV",
        "brand": "BMW"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "type not found"
}
```

### Update Type

-   Method : `PUT`
-   Endpoint : `/api/type/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Request Body :

```json
{
    "name": "SUV",
    "brand_id": 2
}
```

-   Response Body :

```json
{
    "message": "update type success",
    "data": {
        "id": 1,
        "name": "SUV",
        "brand": "Porsche"
    }
}
```

### Delete Type

-   Method : `PUT`
-   Endpoint : `/api/type/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

````json
{
    "message": "delete type success",
    "data": {
        "id": 1,
        "name": "SUV",
        "brand": "BMW"
    }
}

- Response Body (Failed) :
```json
{
    "errors": "type not found"
}
````

## Vehicle Model API

### Create Model

-   Method : `POST`
-   Endpoint : `/api/model`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Body :

```json
{
    "name": "X1",
    "type_id": 1
}
```

-   Response Body :

```json
{
    "message": "create model success",
    "data": {
        "id": 1,
        "name": "X1",
        "type": "SUV"
    }
}
```

### Get All Model

-   Method : `GET`
-   Endpoint : `/api/model`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Body :

```json
{
    "message": "get model success",
    "data": [
        {
            "id": 1,
            "name": "X1",
            "type": "SUV"
        },
        {
            "id": 2,
            "name": "M1",
            "type": "Sedan"
        },
        . . .
    ],
    "metadata": {
        "total": 20,
        "limit": 5,
        "offset": 0,
        "current_page": 1,
        "total_pages": 4
    }
}
```

### Get Model By ID

-   Method : `GET`
-   Endpoint : `/api/model/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "get model success",
    "data": {
        "id": 1,
        "name": "X1",
        "type": "SUV"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "model not found"
}
```

### Update Model

-   Method : `PUT`
-   Endpoint: `/api/model/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Request Body :

```json
{
    "name": "X5",
    "type_id": 1
}
```

-   Response Body :

```json
{
    "message": "update model success",
    "data": {
        "id": 1,
        "name": "X5",
        "type": "SUV"
    }
}
```

### Delete Model

-   Method : `DELETE`
-   Endpoint : `/api/model/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id`= `1`
-   Response Body :

```json
{
    "message": "delete model success",
    "data": {
        "id": 1,
        "name": "X1",
        "type": "SUV"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "model not found"
}
```

## Vehicle Year API

### Create Year

-   Method : `POST`
-   Endpoint : `/api/year`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Body :

```json
{
    "year": "2024"
}
```

-   Response Body :

```json
{
    "message": "create year success",
    "data": {
        "id": 1,
        "year": "2024"
    }
}
```

### Get All Year

-   Method : `GET`
-   Endpoint : `/api/year`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Body :

```json
{
    "message": "get year success",
    "data": [
        {
            "id": 1,
            "year": "2024"
        },
        {
            "id": 2,
            "year": "2025"
        },
        . . .
    ],
    "metadata": {
        "total": 20,
        "limit": 5,
        "offset": 0,
        "current_page": 1,
        "total_pages": 4
    }
}
```

### Get Year By ID

-   Method : `GET`
-   Endpoint : `/api/year/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "get year success",
    "data": {
        "id": 1,
        "year": "2024"
    }
}
```

### Update Year

-   Method : `PUT`
-   Endpoint : `/api/year/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Request Body :

```json
{
    "year": "2023"
}
```

-   Response Body :

```json
{
    "message": "update year success",
    "data": {
        "id": 1,
        "year": "2023"
    }
}
```

### Delete Year

-   Method : `DELETE`
-   Endpoint : `/api/year/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "delete year success",
    "data": {
        "id": 1,
        "year": "2024"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "year not found"
}
```

## Pricelist API

### Create Pricelist

-   Method : `POST`
-   Endpoint : `/api/pricelist`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Body :

```json
{
    "code": "1M",
    "price": 1000000,
    "year_id": 1,
    "model_id": 1
}
```

-   Response Body :

```json
{
    "message": "create pricelist success",
    "data": {
        "id": 1,
        "code": "1M",
        "price": 1000000,
        "year": "2024",
        "model": "X1"
    }
}
```

### Get All Pricelist

-   Method : `GET`
-   Endpoint : `/api/pricelist`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Response Body :

```json
{
    "message": "get pricelist success",
    "data": [
        {
            "id": 1,
            "code": "1M",
            "price": 1000000,
            "year": "2024",
            "model": "X1"
        },
        {
            "id": 2,
            "code": "2M",
            "price": 2000000,
            "year": "2025",
            "model": "M1"
        },
        . . .
    ],
    "metadata": {
        "total": 20,
        "limit": 5,
        "offset": 0,
        "current_page": 1,
        "total_pages": 4
    }
}
```

### Get Pricelist By ID

-   Method : `GET`
-   Endpoint : `/api/pricelist/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "get pricelist success",
    "data": {
        "id": 1,
        "code": "1M",
        "price": 1000000,
        "year": "2024",
        "model": "X1"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "pricelist not found"
}
```

### Update Pricelist

-   Method : `PUT`
-   Endpoint : `/api/pricelist/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Request Body :

```json
{
    "code": "5M",
    "price": 5000000,
    "year_id": 1,
    "model_id": 1
}
```

-   Response Body :

```json
{
    "message": "update pricelist success",
    "data": {
        "id": 1,
        "code": "5M",
        "price": 5000000,
        "year": "2024",
        "model": "X1"
    }
}
```

### Delete Pricelist

-   Method : `DE:ETE`
-   Endpoint : `/api/pricelist/:id`
-   Request Header : `Bearer tokenuyt6r5dfcvbji`
-   Request Param : `id` = `1`
-   Response Body :

```json
{
    "message": "delete pricelist success",
    "data": {
        "id": 1,
        "code": "5M",
        "price": 5000000,
        "year": "2024",
        "model": "X1"
    }
}
```

-   Response Body (Failed) :

```json
{
    "errors": "pricelist not found"
}
```
