import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const apiUrl = process.env.REACT_APP_API_URL;
