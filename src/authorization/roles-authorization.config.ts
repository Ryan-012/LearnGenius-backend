export const ROLES_PERMISSIONS = {
  ADMIN: {
    courses: ['POST', 'GET', 'PUT', 'DELETE'],
    lessons: ['POST', 'GET', 'PUT', 'DELETE'],
    comments: ['POST', 'GET', 'PUT', 'DELETE'],
  },
  TEACHER: {
    courses: ['POST', 'GET', 'PUT'],
    lessons: ['POST', 'GET', 'PUT'],
    comments: ['GET'],
  },
  STUDENT: {
    courses: ['GET'],
    lessons: ['GET'],
    comments: ['POST', 'GET'],
  },
};
