class ConnectError extends Error {
  constructor(message = "Could not connect to Epitech Intranet. Please verify your cookie.") {
    super(message);
    this.name = 'ConnectError';
  }
}

export default ConnectError;
