import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "@/shared/api-response.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Error interno del servidor";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "string") {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === "object" &&
        exceptionResponse !== null
      ) {
        const resObj = exceptionResponse as Record<string, any>;
        if (Array.isArray(resObj.message)) {
          // Si class-validator devuelve una lista de errores, los unimos
          message = resObj.message.join(", ");
        } else if (typeof resObj.message === "string") {
          message = resObj.message;
        } else {
          message = exception.message;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const standardResponse = new ApiResponse(
      false,
      status,
      message,
      null,
    );

    response.status(status).json(standardResponse);
  }
}
