import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { response } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { CourseService } from './service/courses/courses-service'

const handle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    
    if(event.resource.includes('/courses/user/{user_id}') && event.httpMethod.includes('GET'))
      return response(await CourseService.findById(event.pathParameters.user_id), 200);

    if(event.resource.includes('/courses/{id}') && event.httpMethod.includes('DELETE')){
      await CourseService.deleteById(event.pathParameters.id);
      return response({deleted: true} as any, 200)
    }
    if(event.resource.includes('/courses/{id}') && event.httpMethod.includes('GET'))
      return response(await CourseService.findById(event.pathParameters.id), 200);
    
    if(event.resource.includes('/courses/plan') && event.httpMethod.includes('GET'))
      return response(await CourseService.findAll(), 200);
      
    if(event.resource.includes('/courses/plan') && event.httpMethod.includes('POST'))
      return response(await CourseService.save(JSON.parse(event.body as any)), 200);
      
    if(event.resource.includes('/courses/plan') && event.httpMethod.includes('PUT'))
      return response(await CourseService.save(JSON.parse(event.body as any)), 200);

        
    return response({
      data: 'Nenhum recurso encontrado!'
    }, 404)
  } catch (error) {
    return response({
      status: 400
    }, 400)
  }
};

export const main = middyfy(handle);
