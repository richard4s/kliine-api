# kliine-api
API for Kliine

# Default Endpoint
`/`
### GET Request
Just a basic GET request for testing

# Base Endpoint
`/api`
### GET Request
Base route to check if email is present
### Fields
- `email`, type: `string`

## Default User Endpoint
 `/api/mock`
### GET Request
Mocking test route to retrieve all users available

## Register User Endpoint
`/api/register`
### POST REQUEST
Route to register users
Sends a verification email containing a link to verify email with a token that expires after **1 hour**
### Fields
- `firstName`, type: `string`
- `lastName`, type: `string`
- `phone`, type: `string`
- `email`, type: `string` description: `unique field`
- `address`, type: `string`
- `password`, type: `string`
### JSON Response
- `message`, type: `string`,
- `user`, type: `array`, description: `contains all user fields`
- `created`, type `int`, description: `number of users created`

## Verify Email Endpoint
`/api/verify-email/:token`
### Get REQUEST
Route to verify email
### Fields
- `token`, type: `string`
### JSON RESPONSE
- `message`, type: `string`
- `user`, type: `int`, description: `number of users created`

## Delete User Endpoint
`/api/destroy`
### DELETE REQUEST
Route to delete users
**In future** must be admin to do this
### Fields
- `email`, type: `string`
### JSON Response 
- `message`, type: `string`
- `user`, type: `int`, description: `number of users deleted`

# Things left to do for auth
- middleware for password, email and phone number string validations
- middleware to verify token on login and return user info
- check if email is verified when logged in
- check if authentication for future actions
- resend email verification
- forgot password
- check if admin for admin routes
- check if admin middleware to delete user
- resend verification email