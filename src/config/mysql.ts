import * as mysql from 'mysql'
import { Connection} from 'mysql';
import * as dotenv from 'dotenv'

dotenv.config();

const mysqlHost: string = process.env.MYSQL_HOST || 'localhost'
const mysqlPort: number = parseInt(process.env.MYSQL_PORT) || 8889
const mysqlUser: string = process.env.MYSQL_USER || 'root'
const mysqlPassword: string = process.env.MYSQL_PASSWORD || 'root'
const mysqlDatabase: string = process.env.MYSQL_DATABASE || 'ng-skills'

export const mysqlConnection = (): Connection => { 
    const connection = mysql.createConnection({
        host: mysqlHost,
        user: mysqlUser,
        password: mysqlPassword,
        database: mysqlDatabase,
        port: mysqlPort
    })
    
    return connection
}