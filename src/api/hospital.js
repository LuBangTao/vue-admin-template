import request from '@/utils/request'

export function handleHospitalDropbox(data) {
  return request({
    url: '/hospital/dropbox',
    method: 'post',
    data
  })
}
