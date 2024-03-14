export const responseData = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    message,
    content: data,
    date: new Date(),
  });
};
