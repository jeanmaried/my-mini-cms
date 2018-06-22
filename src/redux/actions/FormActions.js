import {
  GET_ALL_PROJECTS,
  GET_PROJECT,
  HANDLE_CHANGE,
  HANDLE_UPDATE
} from './types';

export const getProject = project => ({
  type: GET_PROJECT,
  payload: project
});

export const getAllProjects = projects => ({
  type: GET_ALL_PROJECTS,
  payload: projects
});

export const handleChange = ({ name, value }) => {
  return {
    type: HANDLE_CHANGE,
    payload: { name, value }
  };
};

export const handleUpdate = project => {
  return {
    type: HANDLE_UPDATE,
    payload: project
  };
};
