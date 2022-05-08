import { api } from './../Config/Axios';

const AddGroup = (title, color) => {
  var data = {title, color}
  return api().post('Projects/AddGroup', data);
}

const AddProject = (title, color, groupId) => {
  var data = {title, color, groupId}
  return api().post('Projects/AddProject', data);
}

const GetProjetcsByGroups = () => {
  return api().get('Projects/GetProjetcsByGroups');
}

const GetProjetcsWithoutGroup = () => {
  return api().get('Projects/GetProjetcsWithoutGroup');
}

const GetGroups = () => {
  return api().get('Projects/GetGroups');
}

export default {
  AddGroup,
  AddProject,
  GetProjetcsByGroups,
  GetGroups,
  GetProjetcsWithoutGroup
  };