import { api } from './../Config/Axios';

const AddGroup = (title, color) => {
  var data = {title, color}
  return api().post('Projects/AddGroup', data);
}

const AddProject = (title, color, groupId) => {
  var data = {title, color, groupId}
  return api().post('Projects/AddProject', data);
}
const AddTask = (data) => {
  return api().post('Projects/AddTask', data);
}


const GetProjetcsByGroups = () => {
  return api().get('Projects/GetProjetcsByGroups');
}

const GetProjetcsWithoutGroup = () => {
  return api().get('Projects/GetProjetcsWithoutGroup');
}

const GetAllProjects = () => {
  return api().get('Projects/GetAllProjects');
}

const GetGroups = () => {
  return api().get('Projects/GetGroups');
}

const GetAllTasks = (data) => {
  return api().post('Projects/GetAllTasks', data);
}

const EditTask = (data) => {
  return api().post('Projects/EditTask',data);
}

const GetTasksById = (id) => {
  return api().get('Projects/GetTasksById/'+id);
}

const StartTask = (data) => {
  return api().post('Projects/StartTask/', data);
}

const EndTask = (data) => {
  return api().post('Projects/EndTask/', data);
}

const GetTasksStatic = () => {
  return api().get('Projects/GetTasksStatic/');
}

const TaskCompleted = data => {
  return api().post('Projects/TaskCompleted/', data);
}

const DeleteTask = data => {
  return api().post('Projects/DeleteTask/', data);
}

export default {
  AddGroup,
  AddProject,
  GetProjetcsByGroups,
  GetGroups,
  GetProjetcsWithoutGroup,
  GetAllProjects,
  AddTask,
  GetAllTasks,
  EditTask,
  GetTasksById,
  StartTask,
  EndTask,
  GetTasksStatic,
  TaskCompleted,
  DeleteTask,
  };