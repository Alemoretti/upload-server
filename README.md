# Upload Server

A modern, scalable file upload server built with TypeScript, Fastify, and PostgreSQL. This server provides RESTful APIs for uploading images, managing uploads, and exporting data with comprehensive validation and error handling.

## 🚀 Technologies Used

### Backend Framework
- **Fastify** - High-performance web framework for Node.js
- **TypeScript** - Type-safe JavaScript development
- **Node.js** - JavaScript runtime environment

### Database & ORM
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Type-safe SQL ORM with excellent TypeScript support
- **Drizzle Kit** - Database migrations and schema management

### File Storage
- **AWS S3** (via Cloudflare R2) - Scalable object storage
- **Multipart file uploads** - Efficient file handling

### Validation & Documentation
- **Zod** - Schema validation and type inference
- **Fastify Swagger** - Automatic API documentation
- **Fastify Type Provider Zod** - Type-safe request/response validation

### Testing & Development
- **Vitest** - Fast unit testing framework
- **Faker.js** - Test data generation
- **Biome** - Code formatting and linting
- **Docker** - Containerized development environment

### Data Processing
- **CSV Stringify** - CSV export functionality
- **Node.js Streams** - Efficient data processing

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v10.17.1 or higher)
- **Docker** and **Docker Compose**
- **PostgreSQL** (or use Docker)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd upload-server
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3333
   NODE_ENV=development
   DATABASE_URL=postgresql://docker:docker@localhost:5433/upload
   
   # Cloudflare R2 Configuration
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_ACCESS_KEY_ID=your_access_key
   CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
   CLOUDFLARE_BUCKET=your_bucket_name
   CLOUDFLARE_PUBLIC_URL=https://your-bucket.r2.dev
   ```

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   pnpm run db:migrate
   ```

## 🚀 Usage

### Development Server
```bash
pnpm run dev
```

The server will start on `http://localhost:3333`

### Build for Production
```bash
pnpm run build
```

This will compile TypeScript to JavaScript and generate optimized bundles in the `dist/` folder.

### API Documentation
Visit `http://localhost:3333/docs` to access the interactive Swagger documentation.

## 📚 API Endpoints

### Upload Image
```http
POST /upload-image
Content-Type: multipart/form-data

FormData:
- file: (image file)
```

**Response:**
```json
{
  "id": "uuid",
  "name": "filename.jpg",
  "remoteKey": "storage-key",
  "remoteUrl": "https://storage.com/file.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get Uploads
```http
GET /uploads?searchQuery=test&sortBy=createdAt&sortDirection=desc&page=1&pageSize=20
```

**Response:**
```json
{
  "uploads": [
    {
      "id": "uuid",
      "name": "filename.jpg",
      "remoteKey": "storage-key",
      "remoteUrl": "https://storage.com/file.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Export Uploads
```http
POST /export-uploads
Content-Type: application/json

{
  "searchQuery": "optional search term"
}
```

**Response:**
```json
{
  "reportUrl": "https://storage.com/exports/report.csv"
}
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Build Commands
```bash
# Build for production
pnpm run build

# Development server (with hot reload)
pnpm run dev
```

### Test Database
The test suite automatically sets up a test database and runs migrations before each test run.

**Important:** Create a `.env.test` file for local testing:
```env
PORT=3333
NODE_ENV=test
DATABASE_URL=postgresql://docker:docker@localhost:5433/upload_test

# Test Cloudflare R2 Configuration
CLOUDFLARE_ACCOUNT_ID=test_account_id
CLOUDFLARE_ACCESS_KEY_ID=test_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=test_secret_key
CLOUDFLARE_BUCKET=test_bucket
CLOUDFLARE_PUBLIC_URL=https://test-bucket.r2.dev
```

**Note:** The test database uses port `5433` to match the local Docker setup. Make sure your Docker container is running on port `5433` (which is the default configuration in `docker-compose.yml`).

## 🗄️ Database Management

### Generate Migrations
```bash
pnpm run db:generate
```

### Run Migrations
```bash
pnpm run db:migrate
```

### Database Studio
```bash
pnpm run db:studio
```

## 🏗️ Project Structure

```
src/
├── app/
│   └── functions/           # Business logic functions
│       ├── upload-image.ts
│       ├── get-uploads.ts
│       └── export-uploads.ts
├── infra/
│   ├── db/                 # Database configuration
│   │   ├── schemas/        # Drizzle schemas
│   │   └── migrations/     # Database migrations
│   ├── http/               # HTTP layer
│   │   ├── routes/         # API routes
│   │   └── server.ts      # Fastify server setup
│   └── storage/            # File storage abstraction
└── shared/                 # Shared utilities
    └── either.ts           # Either monad for error handling
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3333 |
| `NODE_ENV` | Environment | No | production |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Yes | - |
| `CLOUDFLARE_ACCESS_KEY_ID` | Cloudflare access key | Yes | - |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Cloudflare secret key | Yes | - |
| `CLOUDFLARE_BUCKET` | R2 bucket name | Yes | - |
| `CLOUDFLARE_PUBLIC_URL` | Public URL for bucket | Yes | - |

## 🚀 Deployment

### Build for Production
```bash
# Compile TypeScript to JavaScript
pnpm run build

# The compiled files will be in the dist/ folder
```

### Docker
```bash
# Build the image
docker build -t upload-server .

# Run the container
docker run -p 3333:3333 --env-file .env upload-server
```

### Production Considerations
- Set up proper environment variables
- Configure database connection pooling
- Set up monitoring and logging
- Configure reverse proxy (nginx)
- Set up SSL certificates
- Configure backup strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm test`
5. Commit your changes
6. Push to the branch
7. Create a Pull Request
