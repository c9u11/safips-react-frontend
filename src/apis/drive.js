import apiClient from './apiClient';

export const reqPostDriveStart = async () => {
  const response = await apiClient.post('/drive/start');
  return response.data;
};

export const reqPostDriveStop = async (id) => {
  const response = await apiClient.post(`/drive/${id}/end`);
  return response.data;
};

export const reqPostDriveSensor = async (id, sensorData) => {
  const response = await apiClient.post(`/drive/${id}/sensor`, sensorData);
  return response.data;
};

export const reqGetDriveList = async (params) => {
  const response = await apiClient.get('/drive', { params });
  return response.data;
};

export const reqGetDrive = async (id) => {
  if (!id) throw new Error('id is required');
  const response = await apiClient.get(`/drive/${id}`);
  return response.data;
};

export const reqGetGlobalEvent = async (params, signal) => {
  const response = await apiClient.get(`/drive/event/global`, { params, signal });
  return response.data;
};

export const reqGetDriveOverview = async () => {
  const response = await apiClient.get(`/drive/overview`);
  return response.data;
};

export const reqGetDriveBadge = async () => {
  const response = await apiClient.get(`/drive/badge`);
  return response.data;
};