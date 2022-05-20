let baseURL = 'https://ahb0baep.lc-cn-n1-shared.com'
export const $http = function (url, method, data = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			method,
			header: {
				"X-LC-Id": "AHB0bAEpzE4U5xaKTaes9j4d-gzGzoHsz" ,
				"X-LC-Key": "CoHIA5BF78f3q6tp1bGOEB7Y" ,
				"Content-Type": "application/json"
			},
			data,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const $get = function(url, data = {}) {
	return $http(url, 'GET', data)
}

export const $post = function(url, data = {}) {
	return $http(url, 'POST', data)
}


export const $put = function(url, data = {}) {
	return $http(url, 'PUT', data)
}

export const $delete = function(url, data = {}) {
	return $http(url, 'DELETE', data)
}