export interface AppService {
  handle(...args: any[]): Promise<any> | any
}
