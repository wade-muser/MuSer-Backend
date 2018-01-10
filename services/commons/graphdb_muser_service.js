require("dotenv").config({ path: "env/config.env" });

const SPARQL_ENDPOINT = process.env.MUSER_RDF_SPARQL_ENDPOINT;
const SPARQL_ENDPOINT_UPDATE = process.env.MUSER_RDF_SPARQL_ENDPOINT_UPDATE;
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const WD_PREFIXES = require('./mappings').prefixes.wd;
const MUSER_PREFIXES = require('./mappings').prefixes.muser;

const SparqlService = require('./sparql_service');
const SparqlQueryFactory = require('./sparql_query_factory');

class GraphdbMuserService extends SparqlService {
    constructor() {
        super(SPARQL_ENDPOINT, undefined, [
                COMMON_PREFIXES, DBP_PREFIXES, WD_PREFIXES, MUSER_PREFIXES
            ]
        );
        
        this.sparqlQueryFactory = new SparqlQueryFactory();
    };
};


module.exports = GraphdbMuserService;