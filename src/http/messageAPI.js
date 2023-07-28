import $host from './index';

export const createMessage = async (theme, text, recipient, userId) => {
  const { data } = await $host.post('/message/create', { theme, text, recipient, userId });
  return data;
};

export const fetchMessages = async (user) => {
  const { data } = await $host.get(`/message/all/${user}`);
  return data;
};
