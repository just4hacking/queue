import { pool } from '../pool'
import { toCamelCase } from '../utils/to-camel-case'
import { ActionStatus } from './action-status'

const TABLE_NAME = 'donations'

export interface Donation {
  id: number
  comment: string
  amount: number
  paid: boolean
  actionStatus: ActionStatus
} 

export class DonationsRepo {
  static async find(): Promise<Donation[]> {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
    const parsedRows = toCamelCase(rows)
    return parsedRows
  }

  static async findById(id:string): Promise<Donation | null> {
    const { rows } = await pool.query(`
      SELECT * FROM ${TABLE_NAME}
      WHERE id = $1
    `, [id])
    const parsedRows = toCamelCase(rows)
    return parsedRows[0] || null
  }

  static async insert(comment:string, amount:number, actionStatus:ActionStatus, paid:boolean): Promise<Donation> {
    const { rows } = await pool.query(`
      INSERT INTO ${TABLE_NAME} (comment, amount, action_status, paid) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [comment, amount, actionStatus, paid])
  
    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  static async setPaid(id:string): Promise<Donation> {
    const { rows } = await pool.query(`
      UPDATE ${TABLE_NAME}
      SET paid = true
      WHERE id = $1
      RETURNING *
    `, [id])

    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }

  static async updateActionStatus(id:string, actionStatus:ActionStatus): Promise<Donation>  {
    const { rows } = await pool.query(`
      UPDATE ${TABLE_NAME}
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
      DELETE FROM ${TABLE_NAME}
      WHERE id = $1
      RETURNING *
    `, [id])

    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }
  */

  static async count(): Promise<number> {
    const { rows } = await pool.query(`
      SELECT COUNT(*) FROM ${TABLE_NAME}
    `)

    return parseInt(rows[0].count)
  }
} 

