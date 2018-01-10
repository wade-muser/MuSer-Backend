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

            queryArtistInfo.execute()
                .then(res => {
                    let cleanResult = DbpediaService.parseQueryResult(res.results.bindings);
                    let rdfSubject = DbpediaService.getCleanUniqueIdentifier(prefix, cleanResult.label[0]);
                    console.log(cleanResult);

                    delete cleanResult.artist;
                    delete cleanResult.label;

                    let statements = DbpediaService.buildStatements(rdfSubject, cleanResult);
                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getSongsForArtistStatements(dbpArtist) {
        let querySongsForArtist = this.getQuery(
            this.sparqlQueryFactory.getQuery(SparqlQueryFactory.SONGS_FOR_ARTIST, dbpArtist)
        );

        return querySongsForArtist;
    }
}


module.exports = DbpediaService;