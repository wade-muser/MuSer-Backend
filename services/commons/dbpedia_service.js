const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const SparqlService = require('./sparql_service');
const SparqlQueryFactory = require('./sparql_query_factory');

class DbpediaService extends SparqlService {
    constructor() {
        super(SPARQL_ENDPOINT, undefined, [COMMON_PREFIXES, DBP_PREFIXES]);
        
        this.sparqlQueryFactory = new SparqlQueryFactory();
    };

    getQueryArtistInfo(dbpArtist, callback) {
        let queryArtistInfo = this.getQuery(
            this.sparqlQueryFactory(SparqlQueryFactory.ARTIST_INFO, dbpArtist)
        );

        return queryArtistInfo;
    };

    getQuerySongsForArtist(dbpArtist) {
        let querySongsForArtist = this.getQuery(
            this.sparqlQueryFactory(SparqlQueryFactory.SONGS_FOR_ARTIST, dbpArtist)
        );

        return querySongsForArtist;
    }
};


module.exports = DbpediaService;