interface Paging {
    content?: [];
    totalElements?: number;
    first?: boolean;
    last?: boolean;
    size?: number;
    empty?: boolean
}

export default interface HttpResponse {
    data: Paging | any;
    message: string;
    status: number;
    description?: string;
}
