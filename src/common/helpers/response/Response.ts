// import { BadRequest, NotFound, Ok } from './ResponseType';
export class ReturnedResponse {
  static Ok(data, message = '', status = 'success') {
    return {
      status,
      data,
      message,
    };
  }

  static BadRequest(message = '', status = 'error') {
    return {
      status,
      message,
    };
  }

  static NotFoundRequest(message = '', data = null, status = 'error') {
    return {
      status,
      message,
      data,
    };
  }
}
