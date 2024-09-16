import { axiosInstance } from '@/helpers/axios';
import { IDBCreate, IDBUpdate } from '@/types';

export class DBServices {
  async addToSheet(job: any): Promise<void> {
    try {
      const { data }: { data: IDBCreate } = job.data;
      await axiosInstance.post('', data);
    } catch (error) {
      throw error;
    }
  }

  async updateToSheet(job: any): Promise<void> {
    try {
      const { data }: { data: IDBUpdate } = job.data;
      await axiosInstance.post('', data);
    } catch (error) {
      throw error;
    }
  }

  async deleteFromSheet(job: any): Promise<void> {
    try {
      const { data }: { data: { item_id: string } } = job.data;
      await axiosInstance.post('', { item_id: data.item_id });
    } catch (error) {
      throw error;
    }
  }
}
