function getAxiosConfig(cookie: string) {
  return {
    headers: {
      Cookie: cookie,
      Referer: "https://intra.epitech.eu/",
    },
  };
}

export default getAxiosConfig;
