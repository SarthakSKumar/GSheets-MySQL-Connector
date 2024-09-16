import { ISheetPOST } from '@/types';
import { pool } from '@/setup/setupDatabase';

export class SheetServices {
  async updateDB(job: any): Promise<void> {
    try {
      const { data }: { data: ISheetPOST } = job.data;
      console.log(data);

      const [id, values] = Object.entries(data)[0];

      if (!id) {
        throw new Error(`Invalid item_id: ${id}`);
      }

      const columnValues = values.map((item: { value: string }) => item.value);

      if (columnValues.length < 5) {
        throw new Error('Insufficient data provided to update or insert row.');
      }

      console.log(columnValues);

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

      const [rows]: any = await pool.query(checkExistenceQuery, [id]);
      const exists = rows[0].count > 0;

      if (exists) {
        await pool.query(updateQuery, [
          columnValues[1],
          columnValues[2],
          columnValues[3],
          columnValues[4],
          id,
        ]);
      } else {
        await pool.query(insertQuery, [
          id,
          columnValues[1],
          columnValues[2],
          columnValues[3],
          columnValues[4],
        ]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to process job: ${error.message}`);
        throw error;
      } else {
        console.error('Failed to process job');
        throw error;
      }
    }
  }
}
