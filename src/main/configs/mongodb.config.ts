// import mongoose from 'mongoose'

// import { env } from './envs.config'

// import { logger } from '@/services/logger'

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(env.MONGO_URI, {})
//     logger.info(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     logger.error(error)
//     process.exit(1)
//   }
// }
