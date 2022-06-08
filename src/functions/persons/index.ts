// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'persons/user/{user_id}'
      },
    },
    {
      http: {
        method: 'delete',
        path: 'persons/{id}'
      },
    },
    {
      http: {
        method: 'get',
        path: 'persons/{id}'
      },
    },
    {
      http: {
        method: 'get',
        path: 'persons'
      },
    },
    {
      http: {
        method: 'put',
        path: 'persons'
      },
    },
    {
      http: {
        method: 'post',
        path: 'persons',
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};
