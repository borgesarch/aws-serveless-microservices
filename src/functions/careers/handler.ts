import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { response } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { CareerPlanService } from './services/careers/plan/career-plan-service'
import { CareerVacancyService } from './services/careers/vacancies/career-vacancy-service'
import { CareerVacancyCandidateService } from './services/careers/candidates/career-vacancy-candidates'

const handle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    if(event.resource.includes('/careers/vacancies/candiates/{person_id}') && event.httpMethod.includes('GET'))
      return response(await CareerVacancyCandidateService.findByPersonId(event.pathParameters.person_id), 200);
      
    if(event.resource.includes('/careers/vacancies') && event.httpMethod.includes('POST'))
      return response(await CareerVacancyService.save(JSON.parse(event.body as any)), 200);

    if(event.resource.includes('/careers/vacancies/candiates') && event.httpMethod.includes('GET'), 200)
      return response(await CareerVacancyService.findAll(), 200);      
      
    if(event.resource.includes('/careers/vacancies/{person_id}') && event.httpMethod.includes('GET'))
      return response(await CareerVacancyService.findByPersonId(event.pathParameters.person_id), 200);    
      
    if(event.resource.includes('/careers/vacancies') && event.httpMethod.includes('GET'))
      return response(await CareerVacancyService.findAll(), 200);
    
    if(event.resource.includes('/careers/plan/person/{person_id}') && event.httpMethod.includes('GET'))
      return response(await CareerPlanService.findByPersonId(event.pathParameters.person_id), 200);

    if(event.resource.includes('/careers/plan/{id}') && event.httpMethod.includes('DELETE'), 200)
      await CareerPlanService.deleteById(event.pathParameters.id);
      
    if(event.resource.includes('/careers/plan/{id}') && event.httpMethod.includes('GET'))
      return response(await CareerPlanService.findById(event.pathParameters.id), 200);
    
     if(event.resource.includes('/careers/plan') && event.httpMethod.includes('GET'))
      return response(await CareerPlanService.findAll(), 200);
      
    if(event.resource.includes('/careers/plan') && event.httpMethod.includes('POST'))
      return response(await CareerPlanService.save(JSON.parse(event.body as any)), 200);
      
    if(event.resource.includes('/careers/plan') && event.httpMethod.includes('PUT'))
      return response(await CareerPlanService.save(JSON.parse(event.body as any)), 200);
  
    return response({
      data: 'Nehum recurso encontrado'
    }, 400)
  } catch (error) {
    return response({
      error: error
    }, 400)
  }
};

export const main = middyfy(handle);
