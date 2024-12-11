import { desc, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { boolean, integer, numeric, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    hashPassword: text("hash_password").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
    isDeleted: boolean("is_deleted").notNull().default(false)
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export const categoryEnums = pgEnum("category", ["electronics", "clothing", "books", "furniture", "other"])
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    category: categoryEnums("category").notNull().default("other"),
    price: numeric("price").notNull(),
    stock: integer("stock").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
    isDeleted: boolean("is_deleted").notNull().default(false)
})

export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>

export const itemStatusEnums = pgEnum("status", ["active", "ordered", "completed"])
export const cart = pgTable("cart", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(()=>users.id),
    productId: integer("product_id").notNull().references(()=>products.id),
    quantity: integer("quantity").notNull(),
    status: itemStatusEnums("status").notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
    isDeleted: boolean("is_deleted").notNull().default(false)
})

export type Cart = InferSelectModel<typeof cart>
export type NewCart = InferInsertModel<typeof cart>

export const orderStatusEnums = pgEnum("status", ["pending", "shipped", "delivered", "cancelled"])
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(()=>users.id),
    total: numeric("total").notNull(),
    status: orderStatusEnums("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
    isDeleted: boolean("is_deleted").notNull().default(false)
})

export type Order = InferSelectModel<typeof orders>
export type NewOrder = InferInsertModel<typeof orders>