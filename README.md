# bt-parking-lot-system

Parking lot management system

# Node.js Starter with TypeScript

Welcome to the Node.js starter with TypeScript readme file!

This starter kit is designed to help you get up and running with a Node.js project using TypeScript. Here are the steps to get started:

## Prerequisites

- Node.js installed on your machine
- Basic knowledge of TypeScript

## Getting Started

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install all the necessary dependencies.
4. Run `npm run build` to build the TypeScript files and generate the JavaScript files in the `dist` folder.
5. Run `npm start` to start the application.

## Database Design

### parking_lots table with columns:

1. id (primary key)
2. name
3. location
4. num_floors
5. num_spots_per_floor_small
6. num_spots_per_floor_medium
7. num_spots_per_floor_large
8. num_spots_per_floor_extra_large.

### parking_spots table with columns:

1. id (primary key)
2. parking_lot_id (foreign key referencing parking_lots.id)
3. floor
4. row
5. spot_number
6. size
7. is_occupied

## TestCase

Command to run testcase - npm run test
