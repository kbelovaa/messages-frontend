import $host from './index';

export const fetchUsers = async () => {
  const { data } = await $host.get('user/all');
  return data;
};

export const fetchUser = async (name) => {
  const { data } = await $host.get(`user/${name}`);
  return data;
};

export const login = async (name) => {
  const { data } = await $host.post('user/create', { name });
  localStorage.setItem('user', name);
  return data;
};
