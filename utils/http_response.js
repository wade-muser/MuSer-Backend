class HttpResponse {
    constructor(builder) {
        this.statusCode = builder.statusCode;
        this.body = builder.body;
        this.header = builder.header;
    }

    getLambdaResponse() {
        const response = {
            statusCode: this.statusCode || 200,
            headers: this.header || {},
            body: JSON.stringify(this.body) || {}
        };
        return response;
    }

    static get HttpResponseBuilder() {
        class HttpResponseBuilder {
            constructor() {

            }

            statusCode(statusCode) {
                this.statusCode = statusCode;
                return this;
            }

            header(header) {
                this.header = header;
                return this;
            }

            body(body) {
                this.body = body;
                return this;
            }

            build() {
                return new HttpResponse(this);
            }
        }
        return HttpResponseBuilder;
    }
}

module.exports = HttpResponse;