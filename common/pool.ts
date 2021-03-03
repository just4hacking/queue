import pg from 'pg'

class Pool {
  _pool: pg.Pool | null = null

  connect(options: pg.PoolConfig) {
    this._pool = new pg.Pool(options)
    return this._pool.query('SELECT 1 + 1;')
  }

  close() {
    if (this._pool === null) 
      throw new Error("Database connection is not connected")

    return this._pool.end()
  }

  //really big sequrity issue with it
  query(sql: string, params?: any[]) {
    if (this._pool === null) 
      throw new Error("Database connection is not connected")
    
    return this._pool.query(sql, params)
  }
}

export const pool = new Pool()