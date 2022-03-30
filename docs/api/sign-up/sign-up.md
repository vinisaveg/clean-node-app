## Sign up

Returns a JSON SignUpResult data.

- **URL**

  /api/signup

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `name=[string]` <br>
  `email=[string]` <br>
  `password=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** <br />

    ```json

    {

        "result": boolean,
        "name": string,
        "accessToken": string

    }

    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: { name: "ErrorName", message: "Error message" } }`

  OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error: { name: "ErrorName", message: "Error message" } }`

  OR

  - **Code:** 500 SERVER INTERNAL ERROR <br />
    **Content:** `{ error: { name: "ErrorName", message: "Error message" } }`

- **Sample Call:**

  ```javascript
  fetch("/api/signup")
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

## References

- [SignUpResult](https://github.com/vinisaveg/next-unicorn-project-server/tree/master/docs/api/sign-up/types/sign-up-result.md)
