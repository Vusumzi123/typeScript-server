

/**
 * this is the peoduction environment all prod config should go here
 */
export const env = {
    prod: true,
    port: 3000,
    cypher: {
        hash: "elservidordelgatotuerto88",
        method: "aes-256-ctr"
    },
    api: {
        endpointSufix: "/api",
        swaggerSufix: "/api-docs"
    }
}