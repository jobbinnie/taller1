import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { errorResponse } from "@/shared/api-response.dtos";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : null;

    let message = "Ocurrió un error inesperado";
    let errors: Record<string, any>[] | null = null;

    if (typeof exceptionResponse === "string") {
      message = exceptionResponse;
    } else if (exceptionResponse && typeof exceptionResponse === "object") {
      const res = exceptionResponse as Record<string, any>;
      if (Array.isArray(res.message)) {
        // class-validator manda un array de mensajes
        message = "Error de validación";
        errors = res.message.map((m: string) => ({ message: m }));
      } else if (res.message) {
        message = res.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json(errorResponse(message, status, errors));
  }
}
