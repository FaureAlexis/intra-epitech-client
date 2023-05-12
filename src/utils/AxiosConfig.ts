function getAxiosConfig(cookie: string) {
  return {
    headers: {
      cookie: cookie,
      referer: "https://intra.epitech.eu/",
    },
  };
}

export default getAxiosConfig;
