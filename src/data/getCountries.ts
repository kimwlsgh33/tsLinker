import type {ICountry} from './ICountry';

// Promise의 반환 형태가 ICountry[] 형식임, 그 프로미스를 반환하는 getCountries함수
export const getCountries = (): Promise<ICountry[]> =>
  new Promise((resolve, reject) => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then((result: any[]) => {
        // 배열데이터에서 ICountry타입의 정보만 추출하고, countries로 포인팅
        const countries = result.map((data: any) => {
          const {region, subregion, name, population} = data;
          return {region, subregion, name: name.common, population} as ICountry;
          // 해당 객체를 ICountry타입이라고, '단언'하기
        });
        // 정상데이터 반환
        resolve(countries);
      })
      .catch(reject);
    // 에러시, reject 데이터 반환
  });

export const getCountriesAsync = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const result = await res.json();
  const countries = result.map((data: any) => {
    const {region, subregion, name, population} = data;
    return {region, subregion, name: name.common, population} as ICountry;
  });

  return countries;
};
