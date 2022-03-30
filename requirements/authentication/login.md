# Login Requirement

## Story

**As** a User <br>
**I want** the system to allow me to login <br>
**So that** I can use all the system functionalities

### Scenario 1

**Given** a User valid login form <br>
**When** he tries to login <br>
**Then** the system log the User in

### Scenario 2

**Given** a User invalid login form <br>
**When** he tries to login <br>
**Then** the system should aware him of the invalid data

### Scenario 3

**Given** a User valid or invalid login form <br>
**When** he tries to login <br>
**And** the internal system fails <br>
**Then** the system should aware him of the failure

## Acceptance tests

1. The system receives a HTTP Post Request.
2. The system validates the user data (e-mail and password).
3. The system checks if the e-mail exists.
4. The system compare the requested password with the stored password.
5. The system generates an access token.
6. The system returns a Success HTTP Response 200, with the data (name and accessToken).

## Exception tests

### Exception - Invalid User Data

1. The system returns an Error HTTP Response 400 if the user data is invalid (e-mail or password).

### Exception - Given User E-mail does not exist

2. The system returns an Error HTTP Response 400 if the given user e-mail does not exist.

### Exception - Given User Password is not correct

3. The system returns an Error HTTP Response 400 if the given password is not correct.

### Exception - Failure on Generating the Access Token

4. The system returns an Error HTTP Response 500 if it fails on generating the access token.

### Exception - Failure on Login the User

5. The system returns an Error HTTP Response 500 if it fails on login the user.
