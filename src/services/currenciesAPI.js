const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = async () => {
  const response = await fetch(END_POINT);
  const jsonFormat = await response.json();
  return jsonFormat;
};

export default currenciesAPI;

// OBS: Preferi fazer o fetch() em um arquivo distinto, assim como foi ensinado no conteúdo do Course.
