import { ISheetPOST } from '@/types';
import { pool } from '@/setup/setupDatabase';
import Logger from 'bunyan';
import { config } from '@/config';

const log: Logger = config.createLogger('SheetService');

export class SheetServices {
  async updateDB(job: any): Promise<void> {
    try {
      const { data }: { data: ISheetPOST } = job.data;

      const [id, values] = Object.entries(data)[0];
      const itemId = parseInt(id, 10);

      const columnValues = values.map((item: { value: string }) => item.value);

      const checkExistenceQuery =
        'SELECT COUNT(*) AS count FROM pet_store_inventory WHERE item_id = ?';
      const insertQuery = `
        INSERT INTO pet_store_inventory (item_id, item_name, category, quantity, price)
        VALUES (?, ?, ?, ?, ?)
      `;
      const updateQuery = `
        UPDATE pet_store_inventory
        SET item_name = ?, category = ?, quantity = ?, price = ?
        WHERE item_id = ?
      `;

      const [rows] = await pool.query(checkExistenceQuery, [itemId]);
      const exists = rows[0].count > 0;

      if (exists) {
        await pool.query(updateQuery, [
          columnValues[1],
          columnValues[2],
          columnValues[3],
          columnValues[4],
          itemId,
        ]);
      } else {
        await pool.query(insertQuery, [
          itemId,
          columnValues[1],
          columnValues[2],
          columnValues[3],
          columnValues[4],
        ]);
      }
    } catch (error) {
      throw error;
    }
  }
}
