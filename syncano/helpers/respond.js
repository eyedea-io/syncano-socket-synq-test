const DEFAULT_MIME_TYPE = 'application/json'

const Response = (data = {}, status = 200, mimetype = DEFAULT_MIME_TYPE) => {
  setResponse(new HttpResponse(status, data, mimetype))
}

Response.json = function (data = {}, status = 200, mimetype = DEFAULT_MIME_TYPE) {
  setResponse(new HttpResponse(status, JSON.stringify(data), mimetype))
}

Response.example = function (index = 0) {
  const { metadata: { response: { examples, mimetype } }} = META
  const { exit_code, example } = examples[index] // eslint-disable-line camelcase
  const response = new HttpResponse(exit_code, example, mimetype)

  setResponse(response)
}

Response.error = function (err, status = 400) {
  const { metadata: { response } } = META
  const mimetype = (response) ? response.mimetype : DEFAULT_MIME_TYPE
  const errorResponse = new HttpResponse(status, JSON.stringify(err), mimetype)

  setResponse(errorResponse)
}

export default Response
