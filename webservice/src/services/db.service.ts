import { IDBCreate } from '@/types';
import { pool } from '@/setup/setupDatabase';

export class DBServices {
  async DBAPICreate(data: IDBCreate): Promise<void> {
    try {
      const { item_id, item_name, category, quantity, price } = data;
      const insertQuery = `
        INSERT INTO pet_store_inventory (item_id, item_name, category, quantity, price)
        VALUES (?, ?, ?, ?, ?)
      `;

      await pool.query(insertQuery, [
        item_id,
        item_name,
        category,
        quantity,
        price,
      ]);
    } catch (error) {
      throw error;
    }
  }
  async DBAPIUpdate(data: IDBCreate): Promise<void> {
    try {
      const { item_id, item_name, category, quantity, price } = data;
      const updateQuery = `
        UPDATE pet_store_inventory
        SET item_name = ?, category = ?, quantity = ?, price = ?
        WHERE item_id = ?
      `;

      await pool.query(updateQuery, [
        item_name,
        category,
        quantity,
        price,
        String(item_id),
      ]);
    } catch (error) {
      throw error;
    }
  }
  async DBAPIDelete(item_id: string): Promise<void> {
    try {
      const deleteQuery = `
        DELETE FROM pet_store_inventory
        WHERE item_id = ?
      `;

      await pool.query(deleteQuery, [item_id]);
    } catch (error) {
      throw error;
    }
  }
}
