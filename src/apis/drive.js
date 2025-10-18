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