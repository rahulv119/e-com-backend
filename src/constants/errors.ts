export type ReturnError = {
    status: number;
    message: string;
    prettyMessage: string;
}

export const ERRORS: Record<string, ReturnError> = {
    USER_NOT_FOUND: {
        status: 404,
        message: "User not found",
        prettyMessage: "The requested user was not found",
    },  
    PRODUCT_NOT_FOUND: {
        status: 404,
        message: "Product not found",
        prettyMessage: "The requested product was not found",
    },
    NO_PRODUCTS_FOUND: {
        status: 404,
        message: "No products found",
        prettyMessage: "No products were found",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not found",
        prettyMessage: "The requested resource was not found",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
        prettyMessage: "You are not authorized to access this resource",
    },
    BAD_REQUEST: {
        status: 400,
        message: "Bad request",
        prettyMessage: "The request was malformed",
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Internal server error",
        prettyMessage: "An internal server error occurred",
    },
    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
        prettyMessage: "You do not have permission to access this resource",
    },
    CONFLICT: {
        status: 409,
        message: "Conflict",
        prettyMessage: "The request could not be completed due to a conflict",
    },
    MISSING_FIELDS: {
        status: 400,
        message: "Missing fields",
        prettyMessage: "One or more required fields are missing",
    }
}
