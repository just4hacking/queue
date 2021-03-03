import { pool } from '../pool'
import { toCamelCase } from '../utils/to-camel-case'

const TABLE_NAME = 'donation_messages'

export interface DonationMessage {
  id: number
  color: string
  donation_id: number
} 

export class DonationMessagesRepo {
  static async find() : Promise<DonationMessage[]> {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
    const parsedRows = toCamelCase(rows)
    return parsedRows
  }

  static async findById(id:string): Promise<DonationMessage | null> {
    const { rows } = await pool.query(`
      SELECT * FROM ${TABLE_NAME}
      WHERE id = $1
    `, [id])
    const parsedRows = toCamelCase(rows)
    return parsedRows[0] || null
  }

  static async insert(color:string, donation_id:number): Promise<DonationMessage> {
    const { rows } = await pool.query(`
      INSERT INTO ${TABLE_NAME} (color, donation_id) 
      VALUES ($1, $2)
      RETURNING *
    `, [color, donation_id])
  
    const parsedRows = toCamelCase(rows)
    return parsedRows[0]
  }
  
  static async count(): Promise<number> {
    const { rows } = await pool.query(`
      SELECT COUNT(*) FROM ${TABLE_NAME}
    `)

    return parseInt(rows[0].count)
  }
} 

