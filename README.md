# 16vc - Take Home Assignment
<br>

## Use this notion doc to get demo endpoints to help you test the app
#### https://www.notion.so/16vc-Take-Home-188a6338516c804e89d6d7c099b5b77f?pvs=4

<br>
<br>

This is a simple application built for a take-home assignment that allows you to manage items, rent them out, and return them. It is built with **Node.js**, **Express**, **TypeScript**, and includes an in-memory database for storing items and their rental data.

## Prerequisites

Before running the app locally, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn** (npm comes bundled with Node.js)

You can check if Node.js and npm are installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

## Clone the Repository

```bash
git clone https://github.com/Niteesh-Kulhari/16vc.git
```

### Navigate to the project directory:

```bash
cd 16vc
```

## Installation

### Once inside the project directory, install the required dependencies using npm

```bash
npm install
```

## Running the Applications

### To run the application locally, use the following steps:

### 1. Build the TypeScript files:

```bash
npm run build
```
### 2. Start the application:

```bash
npm run start
```


### If you want to run the tests

```bash
npm run test
```

## API Endpoints
### Here’s a brief overview of the API endpoints that you can interact with:

#### - POST /api/items - Add a new item to the system.
#### - GET /api/items - Retrieve all items in the system.
#### - POST /api/items/rent - Rent an item by specifying the start and end dates.
#### - POST /api/items/return - Return a rented item.
#### - GET /api/items/search - Search for items by name, price range, or other criteria.


## Troubleshooting
#### If you encounter issues, here are a few things to check:

#### - Port Availability: Make sure the port 3000 is not being used by any other applications. You can change the port in the index.js file if necessary.
#### - Dependencies: If there are issues with package installations, try deleting the node_modules folder and running npm install again.

