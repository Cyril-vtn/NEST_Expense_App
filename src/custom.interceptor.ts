import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('THIS IS INTERCEPTING THE REQUEST');
    console.log(context);
    return handler.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERECPTING THE RESPONSE');
        console.log(data);
        const response = {
          ...data,
          createdAt: data.createdAt.toISOString(),
        };
        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
