const hostname: string = window.location.hostname;
const apiBaseUrl: string = "https://" + hostname + ":3000/"
const apiUrl: string = apiBaseUrl + "api/v1/"

export const environment = {
  production: true,
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
