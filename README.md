# Product Management System with Authentication

A comprehensive Node.js web application for managing products and suppliers with user authentication, following the MVC architecture. Built using Express.js, MongoDB, and EJS templating engine.

## 🌟 Key Features

### User Authentication System
- **Registration**: Email verification, password strength validation
- **Login/Logout**: Session-based authentication
- **Password Recovery**: Reset via email link
- **Session Management**: Using express-session with MongoDB store

### Product Management
- **Product Listing**: Paginated view of all products
- **Filtering**: Filter products by supplier
- **Search**: Search products by name
- **CRUD Operations**:
  - Create new products with supplier association
  - View product details
  - Update product information
  - Delete products (soft delete)

### Supplier Management
- **Supplier Directory**: Complete list of all suppliers
- **CRUD Operations**:
  - Add new suppliers
  - View supplier details and associated products
  - Update supplier information
  - Delete suppliers (with cascade option)

### Security Features
- Password hashing using bcrypt
- CSRF protection
- XSS prevention
- Protected admin routes
- Input validation and sanitization

## 🛠️ Technical Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: express-session, connect-mongo
- **Security**: bcrypt, helmet

### Frontend
- **Template Engine**: EJS
- **CSS Framework**: Bootstrap 5
- **Icons**: Font Awesome
- **JavaScript**: Vanilla JS with Fetch API

### Development Tools
- **Version Control**: Git
- **Linting**: ESLint
- **Development Server**: Nodemon
- **Logger**: Morgan
- **Environment Variables**: dotenv

## 📁 Project Structure

```
part3/
├── config/
│   ├── database.js          # MongoDB configuration
│   └── session.js           # Session configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product CRUD logic
│   └── supplierController.js# Supplier CRUD logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Input validation
│   └── errorHandler.js     # Error handling middleware
├── models/
│   ├── User.js            # User schema and methods
│   ├── Product.js         # Product schema and methods
│   └── Supplier.js        # Supplier schema and methods
├── public/
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── uploads/           # Product images
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── productRoutes.js   # Product routes
│   └── supplierRoutes.js  # Supplier routes
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   └── forgot-password.ejs
│   ├── products/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   ├── suppliers/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── messages.ejs
│   └── error.ejs
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 💻 Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/part3.git
cd part3
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/product-management

# Session Configuration
SESSION_SECRET=your_super_secret_key_here

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

4. **Database Setup**
```bash
# Start MongoDB (Windows)
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"

# Import sample data (optional)
npm run seed
```

5. **Start the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🚀 Usage Guide

### Access the Application
- Open browser: `http://localhost:3000`
- Register a new account
- Login to access admin features

### Admin Operations
1. **Managing Suppliers**
   - Navigate to: `/suppliers`
   - Add new supplier: Click "Add Supplier"
   - Edit/Delete: Use action buttons on supplier list

2. **Managing Products**
   - Navigate to: `/products`
   - Add new product: Click "Add Product"
   - Select supplier from dropdown
   - Set price and quantity
   - Edit/Delete: Use action buttons on product list

### User Features
1. **Homepage**
   - View all products
   - Filter by supplier
   - Search products by name

2. **Account Management**
   - Update profile
   - Change password
   - Reset forgotten password

## 📊 Data Models

### User Schema
```javascript
{
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  createdAt: Date,
  updatedAt: Date
}
```

### Supplier Schema
```javascript
{
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 API Routes

### Authentication Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `POST /auth/forgot-password` - Request password reset

### Protected Routes (Requires Login)
- All CRUD operations for products and suppliers
- Profile management
- Admin functions

## 🔜 Future Improvements

- [ ] Add JWT authentication option
- [ ] Implement GraphQL API
- [ ] Add real-time updates using Socket.io
- [ ] Implement file upload for product images
- [ ] Add advanced search filters
- [ ] Create mobile app version
- [ ] Add analytics dashboard
- [ ] Implement inventory tracking
- [ ] Add multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Support

For support, email your-email@example.com or open an issue in the repository.