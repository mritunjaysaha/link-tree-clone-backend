### signup

`POST` /api/signup

`Description`: create new user

`Fields`: firstName, lastName, email, role

`Type`: JSON

```
first_name: String
last_name: String
email: String
```

### login

`POST` /api/login

`Description`: login the user

`Fields`: username/email, password

`Type`: JSON

```
username: String
password: String
```

### logout

`GET` /api/logout

### isSignedIn

`GET` /api/isSignedIn
