export interface Health {
    status: 'OK' | 'ERROR';
    mockServerResponse?: any;
    errors?: string[];
}
