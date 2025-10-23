export const tryCatchHandler = async (func) => {
  try {
    await func();
  }
  catch (error) {
    alert(error.message);
  }
};