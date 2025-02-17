/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

function buildClient() {
  const client = new PrismaClient();

  return client;
}

/**
 * The type of the PrismaClient with extensions
 */
export type PrismaClientType = ReturnType<typeof buildClient>;

let prisma: PrismaClientType;

declare global {
  var __prisma: PrismaClientType | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  prisma = buildClient();
  prisma.$connect();
} else {
  if (!global.__prisma) {
    global.__prisma = buildClient();
    global.__prisma.$connect();
  }
  prisma = global.__prisma;
}

export default prisma;
