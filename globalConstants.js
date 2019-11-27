import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const assetsUrl = publicRuntimeConfig.assetsUrl;
export const zopimUrl = publicRuntimeConfig.zopimUrl;
export const razorpayUrl = publicRuntimeConfig.razorpayUrl;
export const ravenLibUrl = publicRuntimeConfig.ravenLibUrl;
export const apiUrl = process.env.REACT_APP_API_URL;
export const ravenKey = process.env.REACT_APP_RAVEN_KEY;