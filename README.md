# Expenses app

## Features
- auth
- CRUD endpoints
- performance - pagination,index
- security - ratelimiting secure headers

## Techstack
- Jwt
- Express-ratelimit
- Cors
- Helmet
- Express
- Node js
- Mongodb
- Mongoose
- Dotenv

## How to start
npm install\
create the env you can refer env.example\
npm run dev - start the development\
npm start - start in production


## Endpoints

post /api/auth/login -login\
post /api/auth/register -register

get /api/expenses?limit=10&page=1 - get all expense\
patch /api/expenses/:id - update the expense (:id is the expense id)\
post /api/expenses - create a new expense\
delete /api/expenses/:id - delete the expense (:id is the expense id)