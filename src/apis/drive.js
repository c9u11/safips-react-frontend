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