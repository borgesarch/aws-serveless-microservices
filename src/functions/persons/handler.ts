import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { response } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { PersonService } from './service/persons/person-service'

const handle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    if(event.resource.includes('/persons/{id}') && event.httpMethod.includes('GET'))
      return response(await PersonService.findById(event.pathParameters.id), 200);

    if(event.resource.includes('/persons') && event.httpMethod.includes('GET'))
      return response(await PersonService.findAll(), 200);
      
    if(event.resource.includes('/persons') && event.httpMethod.includes('POST'))
      return response(await PersonService.save(JSON.parse(event.body as any)), 200);
      
    if(event.resource.includes('/persons') && event.httpMethod.includes('PUT'))
      return response(await PersonService.save(JSON.parse(event.body as any)), 200);

    if(event.resource.includes('/persons/user/{user_id}') && event.httpMethod.includes('GET'))
      return response(await PersonService.findById(event.pathParameters.user_id), 200);

    if(event.resource.includes('/persons/{id}') && event.httpMethod.includes('DELETE')){
      await PersonService.deleteById(event.pathParameters.id);
      return response({ deleted: true }, 200)
    } 
      
    return response({
      data: 'Nenhum recurso encontrado!'
    }, 404)

  } catch (error) {
    return response({
      error: error
    }, 400)
  }
};

export const main = middyfy(handle);
