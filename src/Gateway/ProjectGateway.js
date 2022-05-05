import { api } from './../Config/Axios';

const AddGroup = (title, color) => {
  var data = {title, color}
  return api().post('Projects/AddGroup', data);
}

export default {
    AddGroup
  };