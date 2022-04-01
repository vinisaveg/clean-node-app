## Login

Returns a JSON LoginResult data.

- **URL**

  /api/login

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `email=[string]` <br>
  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
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
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: "example@example.com",
      password: "1234",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

## References

- [LoginResult](https://github.com/vinisaveg/next-unicorn-project-server/tree/master/docs/api/login/types/login-result.md)
