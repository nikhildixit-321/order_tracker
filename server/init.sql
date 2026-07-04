CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER',
  phone TEXT,
  address TEXT,
  "isVerified" BOOLEAN NOT NULL DEFAULT false,
  "refreshToken" TEXT,
  "resetPasswordToken" TEXT,
  "resetPasswordUntil" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "userId" TEXT,
  "productId" INTEGER NOT NULL,
  "productTitle" TEXT NOT NULL,
  "productPrice" DOUBLE PRECISION NOT NULL,
  "productThumbnail" TEXT,
  "deliveryLat" DOUBLE PRECISION NOT NULL,
  "deliveryLng" DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL
);

SELECT tablename FROM pg_tables WHERE schemaname='public';
