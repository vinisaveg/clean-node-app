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

## Acceptance tests

1. The system validates the user data.
2. The system ensures given user e-mail is not taken.
3. The system sign up the user with his data.
4. The system returns a success response.

## Exception tests

### Exception - Invalid User Data

1. The system returns an error if the user data is invalid.

### Exception - Given User E-mail is Taken

2. The system returns an error if the given user e-mail is taken.

### Exception - Failure on Signing Up the User

3. The system returns an error if it fails on signing up the user.
