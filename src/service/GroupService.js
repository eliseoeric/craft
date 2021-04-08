import Service from '@Services/Service'
const BASE_URI = '/.netlify/functions'

class GroupService extends Service {
  getAllGroups = () => {
    return this.get(`${BASE_URI}/groups`)
  }
}

export default new GroupService();