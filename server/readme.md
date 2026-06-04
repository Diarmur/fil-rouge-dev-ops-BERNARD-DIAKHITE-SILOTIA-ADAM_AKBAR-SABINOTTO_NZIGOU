# Server

## Prerequisites
- Node.js
- WSL with PostgreSQL installed

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file at the root of the server folder:
```
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

### 3. Start PostgreSQL (in WSL)
```bash
sudo service postgresql start
```

### 4. Create and seed the database (first time only, in WSL)
```bash
sudo -u postgres psql -c "CREATE DATABASE blog_db;"
sudo -u postgres psql -d blog_db -f db/init.sql
```

### 5. Start the server (in WSL)
```bash
cd /mnt/c/Users/<you>/path/to/server
node index.js
```

Server runs on `http://localhost:3000`.