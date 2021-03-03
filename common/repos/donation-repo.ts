import { pool } from '../pool'
import { toCamelCase } from '../utils/to-camel-case'
import { ActionStatus } from './action-status'

export class DonationRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM donations')
    const parsedRows = toCamelCase(rows)
    return parsedRows
  }

  static async findById(id:string) {
    const { rows } = await pool.query(`
      SELECT * FROM donations
      WHERE id = $1
    `, [id])
    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  static async insert(comment:string, amount:number, actionStatus:ActionStatus, paid:boolean) {
    const { rows } = await pool.query(`
      INSERT INTO donations (comment, amount, action_status, paid) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [comment, amount, actionStatus, paid])
  
    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  static async setPaid(id:string) {
    const { rows } = await pool.query(`
      UPDATE Donations
      SET paid = true
      WHERE id = $1
      RETURNING *
    `, [id])

    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  static async updateActionStatus(id:string, actionStatus:ActionStatus) {
    const { rows } = await pool.query(`
      UPDATE Donations
      SET action_status = $2
      WHERE id = $1
      RETURNING *
    `, [id, actionStatus])

    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  /*
  static async delete(id:string) {
    const { rows } = await pool.query(`
      DELETE FROM donations
      WHERE id = $1
      RETURNING *
    `, [id])

    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }
  */

  static async count() {
    const { rows } = await pool.query(`
      SELECT COUNT(*) FROM donations
    `)

    return parseInt(rows[0].count)
  }
} 

