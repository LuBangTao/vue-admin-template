import request from '@/utils/request'

export function handleSearchHospital(data) {
  return request({
    url: '/hospital/dropbox',
    method: 'post',
    data
  })
}
