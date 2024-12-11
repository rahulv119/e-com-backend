import { eq } from "drizzle-orm";
import { ERRORS } from "../constants/errors.js";
import { db } from "../database/db.js";
import { products, type NewProduct } from "../database/schema.js";

export const createProduct = async(data: NewProduct) => {
    try{
        await db.insert(products).values({
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl
        })
        return true
    } catch(error) {
        return false
    }
}

export const getProducts = async() => {
    try {
        const allProducts = await db.select().from(products)
        if (allProducts.length === 0) {
            return ERRORS.NO_PRODUCTS_FOUND
        }
        return allProducts
    } catch(error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const getProductById = async(id: number) => {
    try {
        const [product] = await db.select().from(products).where(eq(products.id, id))
        if (product === undefined) {
            return ERRORS.PRODUCT_NOT_FOUND
        }
        return product
    } catch(error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const getProductsByCategory = async(category: "electronics" | "clothing" | "books" | "furniture" | "other") => {
    try {
        const allProducts = await db.select().from(products).where(eq(products.category, category))
        if (allProducts.length === 0) {
            return ERRORS.NO_PRODUCTS_FOUND
        }
        return allProducts
    } catch(error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const updateProduct = async(id: number, data: NewProduct) => {
    try {
        await db.update(products).set({
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl
        }).where(eq(products.id, id))
        return true
    } catch(error) {
        return false
    }
}

export const deleteProduct = async(id: number) => {
    try {
        await db.delete(products).where(eq(products.id, id))
        return true
    } catch(error) {
        return false
    }
}