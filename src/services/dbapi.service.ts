import { IDBCreate, IDBUpdate } from '@/types';
import { pool } from '@/setup/setupDatabase';

export class DBAPIServices {
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
  async DBAPIUpdate(data: IDBUpdate): Promise<void> {
    try {
      const { item_id, item_name, category, quantity, price } = data;

      //Making the query dynamic based on the data that is passed

      let updateQuery = 'UPDATE pet_store_inventory SET ';
      const queryParams: any[] = [];

      if (item_name !== null && item_name !== undefined) {
        updateQuery += 'item_name = ?, ';
        queryParams.push(item_name);
      }

      if (category !== null && category !== undefined) {
        updateQuery += 'category = ?, ';
        queryParams.push(category);
      }

      if (quantity !== null && quantity !== undefined) {
        updateQuery += 'quantity = ?, ';
        queryParams.push(quantity);
      }

      if (price !== null && price !== undefined) {
        updateQuery += 'price = ?, ';
        queryParams.push(price);
      }

      updateQuery = updateQuery.slice(0, -2);

      updateQuery += ' WHERE item_id = ?';
      queryParams.push(String(item_id));

      await pool.query(updateQuery, queryParams);
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
