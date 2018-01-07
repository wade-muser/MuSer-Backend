const {
    SparqlClient,
    SPARQL
} = require('sparql-client-2');
const GRAPHDB_SELECT_SPARQL_ENDPOINT = "http://localhost:7200/repositories/MuSer";
const GRAPHDB_INSERT_SPARQL_ENDPOINT = "http://localhost:7200/repositories/MuSer/statements";
const client = new SparqlClient(GRAPHDB_SELECT_SPARQL_ENDPOINT, {
    updateEndpoint: GRAPHDB_INSERT_SPARQL_ENDPOINT
});


function selectExample() {

    return client.query(SPARQL `
    PREFIX muser: <http://example.com/muser#>
    SELECT ?spotifyId{
        muser:GEazy muser:idSpotify ?spotifyId.
    }
    `).execute()
        .then(response => {
            return JSON.stringify(response.results.bindings[0].spotifyId.value);
        })
        .catch(err => {
            console.log(err);
        });
}

function insertExample(value) {
    return client.query(SPARQL `
    PREFIX muser: <http://example.com/muser#>

    INSERT DATA {
        muser:GEazy muser:musicalArtistCountry ?value
    }`)
        .bind("value", value)
        .execute()
        .then(response => {
            console.log("Insert was succesfully executed");
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteExample(value) {
    return client.query(SPARQL `
        PREFIX muser: <http://example.com/muser#>
        DELETE DATA {
            muser:GEazy muser:musicalArtistCountry  ?value
        }
    `)
        .bind("value", value)
        .execute()
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
}


deleteExample("AlCeva");