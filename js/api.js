//Base Url & apiKey
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "501d894dd959097e2bb94ad86353f587";

//! 2-a
//Bayrak verilerini alan fonksiyon.Bu fonksiyon benim için kendisine dışarıdan verdiğim ülke kodunu alacak ve ilgili ülkenin bayrağını return edecek.

const getFlagUrl = (countryCode)=> `https://flagcdn.com/w80/${countryCode.toLocaleLowerCase()}.png`;

//! 1-a
// * Hava durumu verilerini alan fonksiyon

const getWeather = async (city) => {
    try {
      // Api'a istek at
      const response = await fetch(
        `${baseUrl}?q=${city}&units=metric&appid=${apiKey}&lang=tr`
      );
      // Gelen veriyi js nesnesine çevir
      const weatherData = await response.json();
  
      // Eğer istek başarısız ise hata fırlat
      if (!response.ok) {
        throw new Error("Aratılan şehir bulunamadı");
      }
  
      // Elde edilen weatherData'yı return et
      return weatherData;
    } catch (error) {
      // Eğer olursa bir hata fırlat
      throw error;
    }
  };
  
  export { getWeather, getFlagUrl };