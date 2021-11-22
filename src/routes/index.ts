import * as express from "express";
import * as api from "./api";

export const register = ( app: express.Application ) => {
    // Define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // Define a route handler for the most popular worst movies search page
    app.get( "/movies", ( req: any, res ) => {
        res.render( "movies" );
    } );

    // Register express API
    api.register( app );
};