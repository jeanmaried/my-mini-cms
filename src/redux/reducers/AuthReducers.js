import { GET_NO_AUTH, GET_USER } from '../actions/types';

export default (
  state = {
    authenticated: false,
    userInfo: {}
    // project: {},
    // projects: undefined,
    // toEdit: '',
    //form
    // id: '',
    // title: '',
    // description: '',
    // titleFr: '',
    // descriptionFr: '',
    // image: '',
    // imageName: '',
    // imageURL: '',
    // websiteURL: '',
    // githubURL: '',
    // projectTags: ''
  },
  action
) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, authenticated: true, userInfo: action.payload };
    case GET_NO_AUTH:
      return { ...state, authenticated: false, userInfo: null };
    // case GET_PROJECT:
    //   return { ...state, project: {} };
    // case GET_ALL_PROJECTS:
    //   return { ...state, projects: action.payload };
    // case HANDLE_CHANGE:
    //   return { ...state, [action.payload.name]: action.payload.value };
    // case HANDLE_UPDATE:
    //   return { ...state, toEdit: action.payload };
    default:
      return state;
  }
};
