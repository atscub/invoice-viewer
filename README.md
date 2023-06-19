## Running the program in dev mode

```bash
$ npm run start
```

## Some remarks

- The project is configured with eslint and prettier. You can setup VS Code
  (and possible other editors) to run prettier on save.
- The project is configured with husky and lint-staged. This means that
  eslint and prettier will run before every commit. If there are any errors
  the commit will be aborted. Other things can be added to the pre-commit hook
  like running the tests before commit.
- The stack is React, MUI, Redux toolkit, Apollo. For mocking the API I used
  MockedProvider from @apollo/client/testing.

## Some of my reasoning when deciding for the architecture

Having the business logic inside Components is not a good practice in my opinion. Components should only care about presentation logic. So, how to separate concerns?

1. One option is to use clases with getters. Initialize the class from `SaleOrder` Interface or `RawInvoice` or whatever name.

2. Use some state management solution, like `RTK` for state management. Now business logic (in this case computing discounts and fees, and total value) can be implemented as service and used in the reducers. This follow the FLUX pattern.

\*\* NOTE: Ideally business logic should be in the server side. Since you need to process the invoice in the server anyway (you can't trust client side code for that). For the sake of this exercise, let's implement it in the client as a service.

3. We could have not use Redux afterall, since we only have one component that needs to access the state. We could have just used Apollo for querying the server and keep the result in a component state. The use of Redux is just to show how to use it.
