const globalVar = global;
import {useSelector} from 'react-redux';

const checkIfErrorOccurs = res => {
  return {
    code: res.status,
    res,
  };
};

const TIME_OUT = 10000;

async function xfetch(path, headerOptions, ops = {noParse: false}) {
  const normalFetch = fetch(path, headerOptions);
  if (ops.noParse) {
    return timeoutPromise(TIME_OUT, normalFetch);
  }
  const res = await timeoutPromise(
    TIME_OUT,
    normalFetch.then(checkIfErrorOccurs),
  );

  if (res.code < 300) {
    if (res.code === 204) {
      return {success: true};
    }
    const response = await res.res.json();
    return response;
  }
  try {
    const response = await res.res.json();
    const err = {
      code: res.code,
      message: response.message,
    };
    return err;
  } catch (e) {
    if (res.code === 426) {
      const err = {
        code: res.code,
        message:
          'We have had some significant upgrades for the app. Please click below to upgrade your app!',
      };
      return err;
    } else {
      const err = {
        code: res.code,
        message: e.message ? e.message : 'Something wrong. Please try again.',
      };
      return err;
    }
  }
}

export const timeoutPromise = function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request time out! Please try again.'));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};

export default xfetch;

function requestWrapper(method) {
  return async (_url, _data = null, _params = {}) => {
    // const token = useSelector(state => state?.user?.token)
    // console.log('tokeennnn', token)
    let url = _url;
    let data = _data;
    let params = _params;
    url = 'https://blooddonation.xyz/api/v1' + url;
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data;
      if (params !== null) {
        url = `${url}?${getQuerystring(params)}`;
      }
      data = null;
    } else if (data === Object(data)) {
      // (data === Object(data)) === _.isObject(data)
      data = JSON.stringify(data);
    }

    // default params for fetch = method + (Content-Type)
    const defaults = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: null,
    };

    if (globalVar.token) {
      defaults.headers.Authorization = `Bearer ${globalVar.token}`;
    }

    if (data) {
      defaults.body = data;
    }

    const paramsObj = {
      ...defaults,
      headers: {...params, ...defaults.headers},
    };
    console.log('a', paramsObj);

    console.log('url: ', url);

    return xfetch(url, paramsObj);
  };
}

function getQuerystring(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

export const get = requestWrapper('GET');
export const post = requestWrapper('POST');
export const put = requestWrapper('PUT');
export const patch = requestWrapper('PATCH');
export const del = requestWrapper('DELETE');
