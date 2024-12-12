import type { Context } from "hono";
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategory, updateProduct } from "../services/products.service.ts";
import { ERRORS } from "../constants/errors.ts";

export const getProductsHandler = async(c: Context) => {
    const products = await getProducts()
    if (products === ERRORS.INTERNAL_SERVER_ERROR) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }
    if (products === ERRORS.NO_PRODUCTS_FOUND) {
        return c.json({
            error: ERRORS.NO_PRODUCTS_FOUND
        }, 404)
    }

    return c.json({
        data: products
    }, 200)
}

export const getProductHandler = async(c: Context) => {
    const id = c.req.param('id')
    const product = await getProductById(Number(id))
    if (product === ERRORS.INTERNAL_SERVER_ERROR) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    if (product === ERRORS.PRODUCT_NOT_FOUND) {
        return c.json({
            error: ERRORS.PRODUCT_NOT_FOUND
        }, 404)
    }

    return c.json({
        data: product
    }, 200)
}

export const getProductByCategoryHandler = async(c: Context) => {
    const category = c.req.param('category') as "electronics" | "clothing" | "books" | "furniture" | "other"
    if (!category) {
        return c.json({
            error: ERRORS.MISSING_PARAMS
        }, 400)
    }

    const products = await getProductsByCategory(category)
    if (products === ERRORS.INTERNAL_SERVER_ERROR) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    if (products === ERRORS.NO_PRODUCTS_FOUND) {
        return c.json({
            error: ERRORS.NO_PRODUCTS_FOUND
        }, 404)
    }

    return c.json({
        data: products
    }, 200)
}

export const createProductHandler = async(c: Context) => {
    const body = await c.req.json()
    if (!body.name || !body.description || !body.category || !body.price || !body.stock || !body.imageUrl) {
        return c.json({
            error: ERRORS.MISSING_FIELDS
        }, 400)
    }

    const insertProduct = await createProduct({
        name: body.name,
        description: body.description,
        category: body.category,
        price: body.price,
        stock: body.stock,
        imageUrl: body.imageUrl
    })

    if (!insertProduct) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 201)
}

export const updateProductHandler = async(c: Context) => {
    const id = c.req.param('id')
    const body = await c.req.json()

    const update = await updateProduct(Number(id), {
        name: body.name,
        description: body.description,
        category: body.category,
        price: body.price,
        stock: body.stock,
        imageUrl: body.imageUrl
    })
    
    if (!update) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 200)
}

export const deleteProductHandler = async(c: Context) => {
    const id = c.req.param('id')
    const product = await deleteProduct(Number(id))
    if (!product) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 200)
}