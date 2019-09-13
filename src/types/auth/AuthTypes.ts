export class LoginResponse {
    /**
     * Denotes the authedicated user id
     */
    authId: string;
    /**
     * Denotes the authendicated user name
     */
    name: string;
    /**
     * Denotes the user's jwt token
     */
    token: string;
}

export interface IUserInfo {
    /**
     * Denotes user name
     */
    name?: string;
    /**
     * Denotes user email
     */
    email: string;
    /**
     * Denotes user password
     */
    password: string;
    /**
     * Denotes user active status
     */
    is_active?: string;
    /**
     * Denotes last updated date
     */
    date_updated?: Date;
    /**
     * Denotes user date of birth
     */
    dob?: any;
    /**
     * Denotes mobile number
     */
    mobile_number: number;
    /**
     * Denotes user role
     */
    role: string;
    /**
     * Something about the user
     */
    about_me?: string;
}

export class Filter {
    /**
     * Denotes user active status
     */
    is_active?: string;
    /**
     * Denotes user role
     */
    roles?: string;
    /**
     * Denotes date of birth
     */
    dob?: any;
    /**
     * Denotes start Date
     */
    startDate?: Date;
    /**
     * Denotes end date
     */
    endDate?: Date;
    /**
     * Denotes dynamic key value pair
     */
    [key: string]: any;
}

export type Sort = {
    /**
     * Denotes `asc` or `desc`
     */
    order: string;
    /**
     * Denotes the name would be sorted
     */
    orderBy: string;
};

export class GridRequest {
    /**
     * Optional property for denotes the rows per page
     */
    row_per_page: number;
    /**
     * Optional property for denotes the page number
     */
    page: number;
    /**
     * Denotes the search query
     */
    search_query: string;
    /**
     * Denotes the {@link Filter} interface
     */
    filter: Filter;
    /**
     * Denotes the {@link Sort} interface
     */
    sort: Sort;
}

export type GridResponse = {
    /**
     * Denotes number of count of documents
     */
    total_count: number;
    /**
     * Contains array of documents
     */
    data: Array<any>;
};
