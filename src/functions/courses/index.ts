// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/courses/user/{user_id}'
      },
    },
    {
      http: {
        method: 'delete',
        path: '/courses/{id}'
      },
    },
    {
      http: {
        method: 'get',
        path: '/courses/{id}'
      },
    },
    {
      http: {
        method: 'put',
        path: '/courses'
      },
    },
    {
      http: {
        method: 'post',
        path: '/courses'
      },
    }
  ],
};
