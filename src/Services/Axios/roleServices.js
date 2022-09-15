import { APIRole } from "./api/roles";

export async function getRoles(startModal) {
  try {
    const response = await APIRole.get('/role');
    return response;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error.response?.status !== 401) {
      startModal('Não foi possível obter a lista de clientes, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while retrieving the clients list.${error}`);
  }
  return false;
}

export async function createRole(name, description, startModal) {
  try {
    const response = await APIRole.post('/role', {
      name,
      description,
    });
    if (response.data.status) {
      startModal('Preencha todos os campos para poder criar um novo cargo');
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error.response.status !== 401) {
      startModal('Não foi possível criar a nova lotação, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while creating a new workspace.${error}`);
  }
}

export const updateRole = async (
  name, description, id, startModal,
) => {
  try {
    const res = await APIRole.patch(`/role/${id}`, {
      name,
      description,
    });
    if (res.data.status) {
      startModal('Preencha todos os campos para poder editar um cargo');
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error.response.status !== 401) {
      startModal('Não foi possível atualizar a lotação, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while updating an already created workspace.${error}`);
  }
};

export const deactivateRole = async (id, startModal) => {
  try {
    const res = await APIRole.patch(`/role/${id}/deactivate`);
    return res;
  } catch (error) {
    if (error.response.status === 500) {
      startModal('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error.response.status !== 401) {
      startModal(`Não foi possivel deletar a lotação.\n${error}`);
    }
    console.error(error);
  }
  return false;
};
