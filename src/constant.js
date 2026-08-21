export const BASE_URL = "https://fastapi-instaverse.onrender.com";

export const STATUS_CODES = {
    // Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};


export const STATUS_MESSAGES = {
    200: 'Request successful',
    201: 'Created successfully',
    202: 'Request accepted',
    204: 'Request successful',

    400: 'Invalid request',
    401: 'Could not validate credentials',
    403: 'You do not have permission to perform this action',
    404: 'The requested resource was not found',
    405: 'Method not allowed',
    409: 'This resource already exists',
    422: 'Please check the information you provided',
    429: 'Too many requests. Please try again later',

    500: 'Something went wrong on the server',
    501: 'This functionality is not implemented',
    502: 'Bad gateway',
    503: 'Service is currently unavailable',
    504: 'Server took too long to respond',
};