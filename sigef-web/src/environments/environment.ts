// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const hostname: string = window.location.hostname;
const apiBaseUrl: string = "http://" + hostname + ":3000/"
const apiUrl: string = apiBaseUrl + "api/v1/"

export const environment = {
  production: false,
  API_URL: apiUrl,
  API_MODULES: {
    AUTH: apiUrl + 'auth',
    GESTION_DOSSIERS: apiUrl + 'dossiers',
    INDEXATION: apiUrl + 'indexation',
    COMMUN: apiUrl + 'commun',
  },
  MEDIAS_PATH: {
    USER_PROFILES: apiBaseUrl + 'profils/',
    FICHIERS_ROOT_PATH: apiBaseUrl + 'fichiers/'
  },
  // PAGINATION_DEFAULT_SIZE: 2
  PAGINATION_DEFAULT_SIZE: 10
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
