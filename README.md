# Node.js MVC CRUD Product-Supplier Management System

A full-stack web application built with Node.js, Express, MongoDB, and EJS following the MVC (Model-View-Controller) architecture pattern. This application allows you to manage suppliers and products with full CRUD operations.

## Features

- **Supplier Management**: Create, read, update, and delete suppliers
- **Product Management**: Create, read, update, and delete products
- **Relationship Management**: Products are linked to suppliers via foreign keys
- **Responsive Design**: Bootstrap-powered responsive UI
- **Form Validation**: Server-side validation with error handling
- **MVC Architecture**: Clean separation of concerns
- **Database Seeding**: Sample data for quick start

## Project Structure

```
node-mvc-crud-product-supplier/
├── package.json                 # Dependencies and scripts
├── .env                        # Environment variables (MongoDB URI)
├── app.js                      # Main application file
├── seed.js                     # Database seeding script
├── models/
│   ├── Supplier.js            # Supplier model schema
│   └── Product.js             # Product model schema
├── controllers/
│   ├── supplierController.js  # Supplier business logic
│   └── productController.js   # Product business logic
├── routes/
│   ├── supplierRoutes.js      # Supplier API routes
│   └── productRoutes.js       # Product API routes
├── views/
│   ├── partials/
│   │   ├── header.ejs         # Header partial
│   │   └── footer.ejs         # Footer partial
│   ├── suppliers/
│   │   ├── index.ejs          # List all suppliers
│   │   ├── new.ejs            # Create supplier form
│   │   ├── edit.ejs           # Edit supplier form
│   │   └── show.ejs           # Show supplier details
│   ├── products/
│   │   ├── index.ejs          # List all products
│   │   ├── new.ejs            # Create product form
│   │   ├── edit.ejs           # Edit product form
│   │   └── show.ejs           # Show product details
│   ├── index.ejs              # Homepage
│   └── error.ejs              # Error page
└── public/
    └── css/
        └── style.css          # Custom styles
```

## Models

### Supplier Model
- **name**: String (required, max 100 characters)
- **address**: String (required, max 200 characters)
- **phone**: String (required, validated format)
- **timestamps**: Created and updated dates

### Product Model
- **name**: String (required, max 100 characters)
- **price**: Number (required, minimum 0)
- **quantity**: Number (required, minimum 0, default 0)
- **supplierID**: ObjectId (required, references Supplier)
- **timestamps**: Created and updated dates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation & Setup

1. **Clone or download the project**
   ```bash
   cd node-mvc-crud-product-supplier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the `.env` file and update the MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/product-supplier-db
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your cloud connection string

5. **Seed the database (optional)**
   ```bash
   node seed.js
   ```

6. **Start the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Access the application**
   - Open your browser and go to: `http://localhost:3000`

## API Endpoints

### Supplier Routes
- `GET /suppliers` - List all suppliers
- `GET /suppliers/new` - Show create supplier form
- `POST /suppliers/new` - Create new supplier
- `GET /suppliers/:id` - Show supplier details
- `GET /suppliers/:id/edit` - Show edit supplier form
- `POST /suppliers/:id/edit` - Update supplier
- `GET /suppliers/:id/delete` - Delete supplier

### Product Routes
- `GET /products` - List all products
- `GET /products/new` - Show create product form
- `POST /products/new` - Create new product
- `GET /products/:id` - Show product details
- `GET /products/:id/edit` - Show edit product form
- `POST /products/:id/edit` - Update product
- `GET/POST /products/:id/delete` - Delete product

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, HTML5, CSS3
- **Middleware**: body-parser, method-override
- **Environment**: dotenv
- **Development**: nodemon

## Development Scripts

```bash
# Start in development mode (with auto-reload)
npm run dev

# Start in production mode
npm start

# Seed database with sample data
node seed.js
```

## Features Implemented

✅ Complete MVC architecture  
✅ CRUD operations for both models  
✅ MongoDB integration with Mongoose  
✅ Form validation and error handling  
✅ Responsive Bootstrap UI  
✅ Foreign key relationships  
✅ Database seeding  
✅ Environment configuration  
✅ Error pages and handling  

## Future Enhancements

- User authentication and authorization
- Search and filtering functionality
- Pagination for large datasets
- Image upload for products
- Export data to CSV/PDF
- REST API endpoints
- Unit and integration tests

## License

MIT License - feel free to use this project for learning and development purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Note**: Make sure MongoDB is running before starting the application. Update the `.env` file with your specific MongoDB connection string.