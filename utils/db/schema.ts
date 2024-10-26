import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const Reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  location: text("location").notNull(),
  wasteType: varchar("waste_type", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  imageUrl: text("image_url"),
  veriificationResult: jsonb("veriification_result"),
  status: varchar("statys", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  collectiorId: integer("collector_id")
    .references(() => Users.id)
    .notNull(),
})

export const Rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  points: integer("points").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedtAt: timestamp("updated_at").defaultNow().notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  desctiption: text("description"),
  name: varchar("name", { length: 255 }).notNull(),
  collectionInfo: text("collection_info").notNull(),
})

export const CollectedWaste = pgTable("collected_waste", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id")
    .references(() => Reports.id)
    .notNull(),
  collectorId: integer("collector_id")
    .references(() => Users.id)
    .notNull(),
  collectionDate: timestamp("collection_date").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("collected"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const Notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  messages: text("messageee").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const Transactions = pgTable("transactions", {
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  amount: integer("amount").notNull(),
  desctiption: text("description"),
  date: timestamp("date").defaultNow().notNull(),
})
