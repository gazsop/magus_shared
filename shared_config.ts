export type TRouteConfig = {
    URI: string,
    PORT: number,
    readonly GET_URI: string,
    readonly GET_ERROR_URI?: string
}

export const SERVER: TRouteConfig = {
    URI: "http://localhost",
    PORT: 4000,
    get GET_URI(){
        return `${this.URI}:${this.PORT}`;
    },
    get GET_ERROR_URI(){
        return `${this.GET_URI}/error`;
    }
}

export const CLIENT: TRouteConfig = {
    URI: "http://localhost",
    PORT: 5173,
    get GET_URI(){
        return `${this.URI}:${this.PORT}`;
    } 
}