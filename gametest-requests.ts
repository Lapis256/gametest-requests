import { http, HttpHeader, HttpRequest, HttpRequestMethod, HttpResponse } from "mojang-net";

interface RequestOptions {
    headers?: Object;
    data?: Object;
    params?: Object;
    timeout?: number;
}

function parseHeaders(headers: Object): HttpHeader[] {
    return Object.entries(headers)
        .map(([key, value]) => new HttpHeader(key, value));
}

function encodeParams(params: Object): string {
    const objectEntries = Object.entries(params);
    if (objectEntries.length === 0) {
        return "";
    }
    return "?" + objectEntries
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
}

async function request(
    method: HttpRequestMethod,
    url: string,
    options: RequestOptions = {},
): Promise<HttpResponse> {
    const req = new HttpRequest(url)
        .setMethod(method);

    if (options.headers) {
        req.setHeaders(parseHeaders(options.headers));
    }
    if (options.data) {
        req.setBody(JSON.stringify(options.data));
    }
    if (options.params) {
        req.uri += encodeParams(options.params);
    }
    if (options.timeout !== undefined) {
        req.setTimeout(options.timeout);
    }

    return await http.request(req);
}

export default {
    async post(
        url: string,
        options?: RequestOptions,
    ): Promise<HttpResponse> {
        return await request(HttpRequestMethod.POST, url, options);
    },

    async put(
        url: string,
        options?: RequestOptions,
    ): Promise<HttpResponse> {
        return await request(HttpRequestMethod.PUT, url, options);
    },

    async get(
        url: string,
        options?: RequestOptions,
    ): Promise<HttpResponse> {
        return await request(HttpRequestMethod.GET, url, options);
    },

    async delete(
        url: string,
        options?: RequestOptions,
    ): Promise<HttpResponse> {
        return await request(HttpRequestMethod.DELETE, url, options);
    },
};
