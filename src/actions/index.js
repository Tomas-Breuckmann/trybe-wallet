// Coloque aqui suas actions
export const SALVA_EMAIL = 'SALVA_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API_SUCCESS = 'RECEIVE_API_SUCCESS';
export const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';

export const actionEmail = (email) => ({ type: SALVA_EMAIL, email });

export const requestAPI = () => ({ type: REQUEST_API });

export const receiveAPISuccess = (data) => ({
  type: RECEIVE_API_SUCCESS,
  data,
});

export const receiveAPIFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data1 = await response.json();
      const data = Object.keys(data1).filter((sigla) => sigla !== 'USDT');
      console.log(data);
      dispatch(receiveAPISuccess(data));
    } catch (error) {
      dispatch(receiveAPIFailure(error));
    }
  };
}
