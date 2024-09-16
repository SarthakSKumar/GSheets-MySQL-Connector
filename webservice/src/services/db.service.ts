import { axiosInstance } from '@/helpers/axios';

export class DBServices {
  async addToSheet(job: any): Promise<void> {
    try {
      const response = await axiosInstance.post('', {
        operation: job.name,
        data: job.data,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateToSheet(job: any): Promise<void> {
    try {
      const response = await axiosInstance.post('', {
        operation: job.name,
        data: job.data,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

  async deleteToSheet(job: any): Promise<void> {
    try {
      const response = await axiosInstance.post('', {
        operation: job.name,
        data: job.data,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
}
