import db from '../../helpers/db'
import respond from '../../helpers/respond'

const user = META.user || {}

if( !user.hasOwnProperty('id') ){
  respond.error({message: 'Unauthorized endpoint call'}, 401)
  process.exit()
}

//link, delete,
db.data.video_storage
.where('user', user.id)
.list()
.then(list => {
  const json = list.map(item => {
    return {
      id: item.id,
      url: item.embeded_url
    }
  })
  respond.json(json)
})
.catch(err => respond.error(err))
