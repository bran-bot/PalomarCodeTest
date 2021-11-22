import axios from "axios";
import Vue from "vue";
import { movieModel } from "./models/movieModel";

/*
This typically isn't how I like to create Vue components, but I wanted to avoid having both a client and server npm build. 
For simplicities sake, this seemed like the best option.
*/

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        moviesFound(): boolean {
            return this.moviesList.length > 0;
        },
        searchEnabled(): boolean {
            return this.selectedPage > 0 && this.selectedCount > 0;
        }
    },
    data() {
        return {
            moviesList: [],
            selectedPage: 1,
            selectedCount: 0,
        };
    },
    el: "#app",
    methods: {
        searchMovies() {
            axios
                .get<movieModel[]>( `/api/mostPopularWorstMovies/${this.selectedPage}`)
                .then( ( response: any ) => {
                    this.sortMovies(response.data);
                } )
                .catch( ( error: Error ) => {
                    // tslint:disable-next-line:no-console
                    console.log( error.message );
                } );
        },
        sortMovies(movieData: any) {
            // Sort by rating
            let sortedData = movieData.sort((a: any, b: any) => parseFloat(a.Rating) - parseFloat(b.Rating));
            // Sort by votes for titles with identical ratings
            sortedData = sortedData.sort((a: any, b: any) => {          
                    if (a.Rating == b.Rating) {
                        return b.Votes - a.Votes;
                    }
                    return a.Rating > b.Rating ? 1 : -1;
                });
            // Filter by the users selected count
            this.moviesList = sortedData.slice(0, this.selectedCount);
        },
        resetSearch() {
            this.selectedPage = 1;
            this.selectedCount = 0;
            this.moviesList = [];
        }
    }
} );