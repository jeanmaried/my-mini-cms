const GET_NO_AUTH = 'GET_NO_AUTH';
const GET_USER = 'GET_USER';
const GET_PROJECT = 'GET_PROJECT';
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const GET_TOGGLE = 'GET_TOGGLE';
const GET_UNTOGGLE = 'GET_UNTOGGLE';
// const GET_EDIT_PROJECT = 'GET_EDIT_PROJECT';

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

// export const getEditProject = project => ({
//   type: GET_EDIT_PROJECT,
//   payload: project
// });

export default (
  state = {
    authenticated: false,
    userInfo: {},
    project: {},
    projects: undefined
    // editProject: ''
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
    // case GET_EDIT_PROJECT:
    //   return { ...state, editProject: action.payload };
    default:
      return state;
  }
};
