# kliine-api
API for Kliine

# Default Endpoint
`/`
### GET Request
Just a basic GET request for testing
#### Status Codes
- `success - 200`
- `error - 400`

# Base Endpoint
`/api`
### GET Request
Base route to check if email is present
### Fields
- `email`, type: `string`
#### Status Codes
- `success - 200`
- `error - 400`

## Default User Endpoint
 `/api/mock`
### GET Request
Mocking test route to retrieve all users available
#### Status Codes
- `success - 200`
- `error - 400`

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
#### Status Codes
- `success - 200`
- `error - 400`

## Verify Email Endpoint
`/api/verify-email/:token`
### Get REQUEST
Route to verify email
### Fields
- `token`, type: `string`
### JSON RESPONSE
- `message`, type: `string`
- `user`, type: `int`, description: `number of users created`
#### Status Codes
- `success - 201`
- `error - 400`
- `JWT error - 401`

## Login User Endpoint
`/api/login`
### POST REQUEST
Route to login users
Responds with a JWT token that expires after **1 hour**
### Fields
- `email`, type: `string`
- `password`, type: `string`
### JSON Response
- `message`, type: `string`,
- `token`, type `string`, description: `JWT token`
- `user`, type: `array`, description: `contains all user fields`
#### Status Codes
- `success - 200`
- `error - 400`
- `error - 401`

## Delete User Endpoint
`/api/destroy`
### DELETE REQUEST
Route to delete users
**In future** must be admin to do this
### Fields
- `email`, type: `string`
- `whoAreYou`, type: `string`, description: `Email of user(must be admin)`
### JSON Response 
- `message`, type: `string`
- `user`, type: `int`, description: `number of users deleted`
#### Status Codes
- `success - 200`
- `error - 400`

## Resend Email Verification Endpoint
`/api/resend-verification`
### Get REQUEST
Route to resend email verification
### Fields
- `email`, type: `string`
### JSON RESPONSE
- `message`, type: `string`
- `toEmail`, type: `string`, description: `Email the verification email was sent to`
#### Status Codes
- `success - 201`
- `error - 400`
- `JWT error - 401`

## Forgot Password Endpoint
`/api/forgot-password`
### Get REQUEST
Route to reset password
### Fields
- `email`, type: `string`
### JSON RESPONSE
- `message`, type: `string`
#### Status Codes
- `success - 201`
- `error - 400`
- `JWT error - 401`

# Things left to do for auth
- middleware for password, email and phone number string validations - **(register middleware)**
- middleware to verify token on login and return user info - **(auth middleware)**
- check if email is verified when logged in - **(auth and verifyToken middleware)**
- check if authenticated for future actions - **(auth and verifyToken middleware)**
- resend email verification - **`/api/resend-verification`**
- forgot password - **`/api/forgot-password`**
- check if admin for admin routes **(admin middleware)**
- check if admin middleware to delete user **(adminCheck middleware)**
- update user information - **Update any available fields**