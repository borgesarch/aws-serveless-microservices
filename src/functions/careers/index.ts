// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'careers/vacancies/candiates/{person_id}'
      },
    },
    {
      http: {
        method: 'post',
        path: 'careers/vacancies'
      },
    },
    {
      http: {
        method: 'get',
        path: 'careers/vacancies/candiates'
      },
    },
    {
      http: {
        method: 'get',
        path: 'careers/vacancies/{person_id}'
      },
    },

    {
      http: {
        method: 'get',
        path: 'careers/vacancies'
      },
    },
    {
      http: {
        method: 'get',
        path: 'careers/plan/person/{person_id}'
      },
    },

    {
      http: {
        method: 'delete',
        path: 'careers/plan/{id}'
      },
    },
    {
      http: {
        method: 'get',
        path: '/careers/plan'
      },
    },

    {
      http: {
        method: 'put',
        path: '/careers/plan'
      },
    },
    {
      http: {
        method: 'post',
        path: '/careers/plan',
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};
