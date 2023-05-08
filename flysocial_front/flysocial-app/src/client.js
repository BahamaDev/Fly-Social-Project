// This is the file for Sanity Client Side
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = new sanityClient({
  // projectId: "0rcvc685",
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
});

const builder = imageUrlBuilder(client);
