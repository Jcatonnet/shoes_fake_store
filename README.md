This is a quick project to develop a fake shoe store.

We built this one page project using the MVC structure.

**Front-end (client):**

- src folder regroups all the frontend structure  
  We build all the small components in the **Components** folder
  We were asked to build a one page app, so most of the logic and state management is in the **App.js** file
- **Services folder**: we built all the frontend API requets in this folder
  - inventoryService (manageing request related to user inventory)
  - userService (managing request related to user creation and data fetch)
  - shoeService (managing requests related to shoes, fetch and update)

** Backend (server)**

- src folder regroups all the backend structure
- **Controllers:** one controller per requests category Inventory / user/ product
- **Models:** prisma model for ElephanstSQL Database
- **Routes**: one route file per category Inventory / user / product
- **Services** one service file per category Inventory / user / product for the business logic
- **Middleware** : to handle authentication used for each API routes
- **index.js** : to expose all routes

To keep the project simple, we used JWT token strategy to build authentication on the routes. We've let the .env file public and pushed on purpose to be able to share the entire project.

**Data structure:
**

For project purpose, we kept the datamodel pretty simple.

- User table, populated after user creation and update if user changes profile
- products table, populated with dummy datas and updated if user purchase some products (quantity available will be updated)
  - We chose to build a productsize table, linked to the products table to manage quantity at the deeper level. We did not apply this for the color, to keep it simple.
- inventoy table: populated after each user purchase, to be able to easily retrieve the user history and detail of products purchased

We chose to keep this project as simple as possible to have a MVP ready.
There are multiple enhancements:
States are currently managed indivdually through the main App.js. In a more complex project we would have use a state/ context manager like Redux to avoid unecessary database calls.
Build a muluti-page app, to have a cleaner structure and data management through the components and better performances
More complex authentication, with loggouts and sessions storage for the Cart.
Enhance the security, with more env variables and authorization for APIs.
Frontend cleaning, with a theme for a neat UI
More complex data model, saving transactions information after each purchase

**How to start:**

- open 2 terminal. go to client folder and run **npm start**. Do the same within the **server** folder.
- User should land on the main loging page.
- Once the user is registered, user should land on the grid page
- If not, that means there is a refresh issue with the JWT Token
- To solve that: go to application tab -> locastorage -> delete the token and refresh the page.

**User flow**

- Logging page : enter your user credential. If you have no account, click on sign up and create one.
- User can add shoes from the grid, or from the detail modal if they click on a product
- the product is added to the user cart
- product can be removed or quantity can be reduced from the cart
- On the profile tab, user can modify they data an view there all time inventory
- Once the user click on pay on the cart, a modal opens with User info retrieve from the User profile
- user can proceed to payment. The quantity per size purchased will be deduced from the total inventoy in DB, and then added to the user inventory
