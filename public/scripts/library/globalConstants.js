const baseUrl = "http://localhost:3000";
let accessToken = null;
let userData = null;

// responds statuses:
const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

// error types:
const UNAUTHORIZED = "Unauthorized";
const DUBLICATED_DATA = "DublicatedData";
const NOT_FOUNDED_DATA = "NotFoundedData";
const VALIDATION_ERROR = "ValidationError";