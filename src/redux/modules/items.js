const GET_NO_AUTH = 'GET_NO_AUTH';
const GET_USER = 'GET_USER';
const GET_PROJECT = 'GET_PROJECT';
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

export const getNoAuth = () => ({
  type: GET_NO_AUTH
});

export const getUser = user => ({
  type: GET_USER,
  payload: user
});

export const getProject = project => ({
  type: GET_PROJECT,
  payload: project
});

export const getAllProjects = projects => ({
  type: GET_ALL_PROJECTS,
  payload: projects
});

export default (
  state = {
    authenticated: false,
    userInfo: {},
    project: {},
    projects: undefined
  },
  action
) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, authenticated: true, userInfo: action.payload };
    case GET_NO_AUTH:
      return { ...state, authenticated: false, userInfo: null };
    case GET_PROJECT:
      return { ...state, project: {} };
    case GET_ALL_PROJECTS:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};
