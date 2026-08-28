export class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
    timestamp: string;
    
constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data: T | null = null,
    timestamp: string = new Date().toISOString(),
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }
}