### Development
### User Authentication
#
The following repo contains code for a simple JWT/Session based User Authentication system. The API was created using Node js, Fastify and Sqlite.

The API parses HTTP requests and reads JSON bodies.

Example of JSON body for Account creation:
```JSON
{
    "username": "Alpha",
    "password": "12345"
}
```
User accounts are created and stored in a local sqlite database. Passwords are hashed using Bcrypt js.

The API returns an access token which is stored as a cookie and creates a session in the database. The access token is used to validate requests to protected routes and otherwise rejected.



