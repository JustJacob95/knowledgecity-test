import axios from 'axios';

class JwtService {

	events = [];

	init() {
		this.setInterceptors()
		this.handleAuthentication()
	}

	on = (event, callback) => {
		this.events[event] = callback;
	};

	emit = (eventName, message) => {
		this.events[eventName].call(this, message)
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the use
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();
		if (!access_token) {
			this.emit('onNoAccessToken');
			return false;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
			return true
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
			return false
		}
	};

	setSession = (access_token) => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = (access_token) => {
		//todo can check token for expiring but for now it's ok
		if(!access_token) {
			return false;
		}
		return true
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();
export default instance;
