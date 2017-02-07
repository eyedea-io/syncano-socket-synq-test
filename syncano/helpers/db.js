import connect from 'syncano-server'

const { token, instance } = META

const server = connect({
  token,
  instanceName: instance
})

export default server
