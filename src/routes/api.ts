import * as express from "express";
import fetch from 'cross-fetch';

export const register = ( app: express.Application ) => {

    app.get(`/api/mostPopularWorstMovies/:page`, async (req, res) => {
        try {
            const apiResponse = await fetch(
                'https://worstmovies.azurewebsites.net/worstMovies?page=' + req.params.page,
                {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const apiResponseJson = await apiResponse.json()
            return res.json( apiResponseJson.data );
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    })

};