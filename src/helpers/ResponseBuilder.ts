import { ApiResponse, AdminError } from "../types/General";
/**
 * To build a global success response for all the apis
 *
 * @param { object } data
 * @param { string } message
 * @param { number } statusCode
 */
export const buildSuccessResponse = (data: any,
                                     message: string = "Response received for this request...!"): ApiResponse => ({
    data: {
        ...data
    },
    message
});

/**
 * To build a global error response parser.
 *
 * @param { object } error
 */
export const buildErrorResponse = (error: AdminError): ApiResponse => ({
    data: {},
    message: error.message || "Request caught an error...!"
});
