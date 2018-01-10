const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const SparqlService = require('./sparql_service');
const SparqlQueryFactory = require('./sparql_query_factory');

class DbpediaService extends SparqlService {
    constructor() {
        super(SPARQL_ENDPOINT, undefined, [COMMON_PREFIXES, DBP_PREFIXES]);

        this.sparqlQueryFactory = new SparqlQueryFactory();
    }

    getArtistInfoStatements(dbpArtist, prefix) {

        let promisifiedFunction = (resolve, reject) => {

            let queryArtistInfo = this.getQuery(
                this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ARTIST_INFO, dbpArtist)
            );
            console.log(queryArtistInfo.originalText);

            let statements = [];
            queryArtistInfo.execute()
                .then(res => {
                    let cleanResults = DbpediaService.parseQueryResult(res.results.bindings);
                    Object.keys(cleanResults).forEach(key => {
                        let cleanResult = cleanResults[key];
                        let rdfSubject = DbpediaService.getCleanUniqueIdentifier(prefix, cleanResult.label[0]);
                        console.log(cleanResult);

                        delete cleanResult.entity;
                        delete cleanResult.label;

                        let statement = DbpediaService.buildStatements(rdfSubject, cleanResult);
                        statements.push(statement);

                    });
                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getSongsForArtistStatements(dbpArtist, prefix) {

        let promisifiedFunction = (resolve, reject) => {
            let querySongsForArtist = this.getQuery(
                this.sparqlQueryFactory.getQuery(SparqlQueryFactory.SONGS_FOR_ARTIST, dbpArtist)
            );
            console.log(querySongsForArtist.originalText);

            let statements = [];
            querySongsForArtist.execute()
                .then(res => {
                    let cleanResults = DbpediaService.parseQueryResult(res.results.bindings);
                    Object.keys(cleanResults).forEach(key => {
                        let cleanResult = cleanResults[key];
                        let rdfSubject = DbpediaService.getCleanUniqueIdentifier(prefix, cleanResult.label[0]);
                        console.log(cleanResult);

                        delete cleanResult.entity;
                        delete cleanResult.label;

                        let statement = DbpediaService.buildStatements(rdfSubject, cleanResult);
                        statements.push(statement);
                    });
                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }
}


module.exports = DbpediaService;