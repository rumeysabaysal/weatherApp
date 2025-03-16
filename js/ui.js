//! 3-a
//HTML'den çekilecek elemanları bir arada tutan obje

const elements = {
    form:document.querySelector("form"),
    //4-a devamı...
    loader:document.querySelector('#loader'),
    errorMessage:document.querySelector('#error-message'),
    //weather-container'a erişmem lazım. neden?başlangıçta gözükmesin diye opacity:0 vermiştik bunun tekrar gözükmesini isteyeceğim.
    weatherContainer: document.querySelector("#weather-container"),
    location: document.querySelector("#location"),
    countryFlag: document.querySelector(".country-flag"),
    date: document.querySelector("#date"),
    temperature: document.querySelector("#temperature"),
    feelLike: document.querySelector("#feel-like"),
    weatherIcon: document.querySelector(".weather-icon "),
    weatherDescription: document.querySelector("#weather-description"),
    windSpeed: document.querySelector("#wind-speed"),
    humidity: document.querySelector("#humidity"),
    pressure: document.querySelector("#pressure"),
    citiesDataList: document.querySelector("#turkish-cities"),
    themeBtn: document.querySelector("#theme-toggle-btn"),
};

//! 6-a
//Loader'ı aktif edenfonksiyon
const showLoader = ()=>{
    elements.loader.style.display = "flex";
    elements.weatherContainer.classList.add("hidden");
}

//Loader'ı yok eden fonksiyon
const hideLoader = ()=>{
    elements.loader.style.display = "none";

}


//! 9-a
// Error'ı render eden fonksiyon
const showError = () => {
    // Error'ın gözükmesi için show classı ekle
    elements.errorMessage.classList.add("show");
  };
  
  // Error'ı gizleyen fonksiyon
  
  const hideError = () => {
    elements.errorMessage.classList.remove("show");
  };
  

//! 4-a
//API'dan gelen hava durumu verisi ve bayrak ile arayüzü renderlayan fonksiyon 
//fonksiyonumu oluşturuyorum sonra içerisine data ve flag parametrelerini geçiyorum.
//formun haricinde bana arayüz kısmı lazım. bunun için sırayla ;
    // weather.scss kısmında weather-container yapısında hidden kısmını kaldırmam gerekiyor. bu yüzden weather containera erişmem lazım. 
    // sonrasında loader'a erişmem lazım.buarada da style.scss kısmında loader-container kısmında display'ini none yapmıştık her zaman arayüzde olmasın diye, burayı block yapmam lazım.
    //error kısmına erişmem lazım. buarada da style.scss de errr-message kısmında bulunan display none'ı blok yapmam lazım.Eğer hata varsa bunu görebilmek için.
//tüm bu elemanlara erişmek için öncelikle elements objesinin içerisinde bu elemanları oluşturacağım. Sonra displayWeather fonksiyonunu çalıştıracağım.

const displayWeather = (data,flagUrl)=>{

    //Güncel tarih verisini elde etmem gerekiyor. Çünkü fonksiyonu çalıştırdığımda konsolda yer alan değerler içinde tarih verisi yer almıyor. Önce bunu elde etmem gerekiyor. (newDate) ve bu veriyi lokale göre alabilmek için toLocale... kullanıyorum

    const date = new Date().toLocaleDateString("tr", {
        day: "numeric",
        month: "long",
        year:"numeric",
        weekday: "long"

    });
    // console.log(date);
    console.log(data);
    // console.log(flagUrl);

    //
    //ama flagUrl ve data verisi undefined görünüyor çünkü fonksiyonu yanlış yerde çalıştırdım (4-b)değiştirmem lazım!!

    //! 5-a
    //Arayüz noktasında kapsayıcıyı görübür kılmam gerekiyor.weather container'ı görünür kıl.bunun için classlistini kaldırmam gerekiyor.Bunu da remove ile yapıyorum.
    elements.weatherContainer.classList.remove("hidden");

    //şehir adını ve ülke kodunu güncelle(ankara,tr)konsolda yer alan data verisinin içindeki ilgili alanları yazdırıyorum.
    elements.location.textContent = `${data.name}, ${data.sys.country}`;

    //bayrağı güncelle
    elements.countryFlag.innerHTML = `<img src="${flagUrl} " alt="flag">`;

    //tarihi güncelle
    elements.date.textContent = date;

    //sıcaklık ve hissedilen sıcaklık güncelle
    elements.temperature.textContent = Math.round(data.main.temp)+"°C";
    elements.feelLike.textContent = `Hissedilen ${Math.round(data.main.feels_like)+"°C"}`;
   
    //icon ve description güncelle
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon} @2x.png`
    elements.weatherDescription.textContent = `${data.weather[0].description}`;

    //wind-hummidty-pressure güncelle
    elements.windSpeed.textContent = `${data.wind.speed} m/s`;
    elements.humidity.textContent = `${data.main.humidity} %`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;

    // Weather Container'ı görünür kıl
    elements.weatherContainer.classList.remove("hidden");
};

// Theme Icon'unu güncelleyen fonksiyon

const updateThemeIcon = (theme) => {
  // Icon'a eriş
  const icon = elements.themeBtn.querySelector("i");

  // Buton içeriği eğer theme koyu theme ise güneş değilse ay iconu olsun
  icon.className = theme == "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
};




export {
    elements,
    displayWeather,
    showLoader,
    hideLoader,
    showError,
    hideError,
    updateThemeIcon,
  };