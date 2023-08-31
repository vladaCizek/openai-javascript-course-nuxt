export const throwError = ({
  statusCode = 500,
  statusMessage = "Something went wrong!",
}) => {
  throw new Error({
    statusCode: statusCode,
    statusMessage: statusMessage,
  });
};
