-- Create users table with recommended fields
CREATE TABLE users (
   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   email TEXT UNIQUE NOT NULL,
   name TEXT,
   image TEXT,
   provider TEXT NOT NULL DEFAULT 'google',
   provider_id TEXT UNIQUE,
   last_login TIMESTAMP DEFAULT now(),
   created_at TIMESTAMP DEFAULT now(),
   updated_at TIMESTAMP DEFAULT now(),
   role TEXT DEFAULT 'user',
   metadata JSONB DEFAULT '{}'
);
