const GenresServices = require('./genres_service');

module.exports.getGenres = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/genres response',
        }),
    };

    callback(null, response);
};

module.exports.getGenreById = (event, context, callback) => {
    const genreId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/genres/{id} response: id = ${genreId}`,
        }),
    };

    callback(null, response);
};

module.exports.getGenresRelatedById = (event, context, callback) => {
    const genreId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/genres/{id}/related response: id = ${genreId}`,
        }),
    };

    callback(null, response);
};

module.exports.getTimelineForGenre = (event, context, callback) => {
    const genreId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/genres/{id}/timeline response: id = ${genreId}`,
        }),
    };

    callback(null, response);
};