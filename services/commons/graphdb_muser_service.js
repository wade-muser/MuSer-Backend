require("dotenv").config({
    path: "env/config.env"
});

const SPARQL_ENDPOINT = process.env.MUSER_RDF_SPARQL_ENDPOINT;
const SPARQL_ENDPOINT_UPDATE = process.env.MUSER_RDF_SPARQL_ENDPOINT_UPDATE;
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const WD_PREFIXES = require('./mappings').prefixes.wd;
const MUSER_PREFIXES = require('./mappings').prefixes.muser;
const MUSER_VAR_TO_PREDICATE = require("./mappings").varToPredicate;


const SparqlService = require('./sparql_service');
const SparqlQueryFactory = require('./sparql_query_factory');

class GraphdbMuserService extends SparqlService {
    constructor() {
        console.log(SPARQL_ENDPOINT, SPARQL_ENDPOINT_UPDATE);
        super(SPARQL_ENDPOINT, SPARQL_ENDPOINT_UPDATE, [
            COMMON_PREFIXES, DBP_PREFIXES, WD_PREFIXES, MUSER_PREFIXES
        ]);

        this.sparqlQueryFactory = new SparqlQueryFactory();
    }

    findAllArtists() {

    }

    findArtistsWithoutSpotify() {
        let promisified_function = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ARTISTS_WITHOUT_SPOTIFY);
            this.getQueryResults(query)
                .then(cleanResults => {
                    resolve(cleanResults);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    findSongWithoutSpotify() {
        let promisified_function = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.SONGS_WITHOUT_SPOTIFY);
            this.getQueryResults(query)
                .then(cleanResults => {
                    resolve(cleanResults);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    findAlbumsWithoutSpotify() {
        let promisified_function = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ALBUMS_WITHOUT_SPOTIFY);
            this.getQueryResults(query)
                .then(cleanResults => {
                    resolve(cleanResults);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    buildStatementFromAPIResponse(results) {
        let statements = [];
        Object.keys(results).forEach(result => {
            const values = results[result];
            Object.keys(values).forEach(value => {
                const subject = this.formatEntityValue(result);
                const predicate = MUSER_VAR_TO_PREDICATE[value].predicate;
                const object = `\"${values[value]}\"${MUSER_VAR_TO_PREDICATE[value].type}`;
                statements.push([{
                    s: subject,
                    p: predicate,
                    o: object,
                }]);

            });
        });

        return statements;
    }

    formatEntityValue(entity) {
        return entity.startsWith("http://") ? `<${entity}>` : `muser:${entity}`;

    }

}


module.exports = GraphdbMuserService;