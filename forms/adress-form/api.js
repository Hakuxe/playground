export const getUfs = async () => {
	const ufsList = [];

	await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
		.then((response) => {
         if(response.status !== 200){
            throw new Error('url sem resposta');
         }
         return response.json();
      })
		.then((data) => ufsList.push(...data))
      .catch(error => console.error('Fetch não completado ', error));

	return ufsList;
};

/**
 * @param {String} uf - sigla do estado 
 * */ 
export const getCityByUf = async (uf) => {
   const cities = [];
   await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then((response) => {
         if(response.status !== 200){
            throw new Error('url sem resposta');
         }
         return response.json();
      })
      .then((data) => cities.push(...data))
      .catch(error => console.error('Fetch não completado ', error));
   return cities;
}

