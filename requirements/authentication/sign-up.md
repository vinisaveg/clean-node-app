# Sign Up Requirement

## Story

**As** a User <br>
**I want** the system to allow me to sign up <br>
**So that** I can use all the system functionalities

### Scenario 1

**Given** a User valid sign up form <br>
**When** he tries to sign up <br>
**Then** the system sign him up

### Scenario 2

**Given** a User invalid sign up form <br>
**When** he tries to sign up <br>
**Then** the system should aware him of the invalid data

### Scenario 3

**Given** a User already registered e-mail on the sign up form<br>
**When** he tries to sign up <br>
**Then** the system should aware him of the already registered e-mail

### Scenario 4

**Given** a User valid or invalid sign up form <br>
**When** he tries to sign up <br>
**And** the internal system fails <br>
**Then** the system should aware him of the failure

## Acceptance tests

1. The system receives a HTTP Post Request.
2. The system validates the user data (name, e-mail and password).
3. The system ensures given user e-mail is not taken.
4. The system creates a hash for the password.
5. The system stores the data on the database.
6. The system generates an access token.
7. The system returns a Success HTTP Response 201, with the data (name and accessToken).

## Exception tests

### Exception - Invalid User Data

1. The system returns an Error HTTP Response 400 if the user data is invalid (name, e-mail or password).

### Exception - Given User E-mail is Taken

2. The system returns an Error HTTP Response 403 if the given user e-mail is taken.

### Exception - Failure on Hashing User password

3. The system returns an Error HTTP Response 500 if it fails on hashing the password.

### Exception - Failure on Signing Up the User

4. The system returns an Error HTTP Response 500 if it fails on storing the user on the database.

### Exception - Failure on Generating the Access Token

5. The system returns an Error HTTP Response 500 if it fails on generating the access token.
