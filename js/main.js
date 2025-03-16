import { getFlagUrl, getWeather } from "./api.js";
import {
  displayWeather,
  elements,
  hideError,
  hideLoader,
  showError,
  showLoader,
  updateThemeIcon,
} from "./ui.js";
import cities from "./constants.js";

const body = document.body;

// Theme attribute
const savedTheme = localStorage.getItem("data-theme") || "light";

// Body'e tema attribute'ünü aktar
body.setAttribute("data-theme", savedTheme);

// Theme butonuna tıklanınca çalışacak fonksiyon
elements.themeBtn.addEventListener("click", () => {
  // Mevcut theme ya eriş
  const currentTheme = body.getAttribute("data-theme");

  // Yeni theme'yı belirle
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Yeni theme'yı body'e attribute olarak aktar
  body.setAttribute("data-theme", newTheme);

  // Theme'i local storage'a kaydet
  localStorage.setItem("data-theme", newTheme);

  // Iconu güncelle
  updateThemeIcon(newTheme);
});

// Sayfa yüklendiği anda
document.addEventListener("DOMContentLoaded", () => {
  // Options oluştur
  createOption(cities);
});

// Form gönderildiğinde çalışacak fonksiyon
elements.form.addEventListener("submit", async (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();

  // Form içerisindeki inputun değerine eriş
  const query = e.target[0].value.trim();

  // Eğer input boş ise fonksiyonu durdur
  if (!query) {
    alert("Şehir isminin girilmesi zorunludur.Lütfen şehir adı giriniz.");

    return;
  }

  // Loader'ı render et
  showLoader();

  try {
    // Api'dan hava durumu verilerini al
    const weatherData = await getWeather(query);

    // Api'dan bayrak verilerini al
    const flagUrl = getFlagUrl(weatherData.sys.country);

    // Hava durumu verileri ve bayrağı render et
    displayWeather(weatherData, flagUrl);

    // Error'u gizle
    hideError();
  } catch (error) {
    // Eğer hata varsa error fonksiyonunu çalıştır
    showError();
  } finally {
    // Loader'ı gizle
    hideLoader();
  }
});

// Data-list için option'lar oluşturan fonksiyon
const createOption = (cities) => {
  // Dışarıdan verilen şehir dizisini dön ve herbir dizi elemanı için bir option oluştur
  cities.forEach((city) => {
    // Her eleman için bir option oluştur
    const option = document.createElement("option");

    // Optionların value'sunu şehir adı olarak ayarla
    option.value = city;

    // Oluşturulan optionları html kısmındaki data-list elemanının içerisine aktar
    elements.citiesDataList.appendChild(option);
  });
};
















































// import { getFlagUrl, getWeather } from "./api.js";
// import { displayWeather, elements ,showLoader , hideLoader, showError} from "./ui.js";
// import  cities from "./constant.js"

// //! 7-C
// // Sayfa yüklendiği anda
// document.addEventListener("DOMContentLoaded", () => {
//    //! 7-b
// //Datalist için optionlar oluşturan fonksiyon

// const createOption = (cities) => {
//     // Dışarıdan verilen şehir dizisini dön ve herbir dizi elemanı için bir option oluştur
//     cities.forEach((city) => {
//       // Her eleman için bir option oluştur
//       const option = document.createElement("option");
  
//       // Optionların value'sunu şehir adı olarak ayarla
//       option.value = city;

//         //?Sıradaki amacım ne? oluşturduğum tüm opitonları html'de ilgili (js ile doldurlacak yazan) yere aktarabilmek. Bunun için de id'sini alıp((turkish-cities) ) elementsin içinde yeni br yapı oluşturuyorum.(ui.js)

//         // Oluşturulan optionları html kısmındaki data-list elemanının içerisine aktar
//     elements.citiesDataList.appendChild(option);
//   });
// };
//     createOption(cities);

//      //? BU FONKSİYONUN DOĞRU ÇALIŞMASI İÇİN SAYFA YÜKLENDİĞİ ANDA ÇALIŞMASI GEREKİYOR. BUYÜZDEN sayfa yüklendiği anda tanımladım ve çalıştırdım!! (Aşağıda tanımlamıştım ama sayfa yüklendiğinde fonksiyonu çağırdığımda hata aldım."Bu hata, createOption fonksiyonunun kullanılmadan önce tanımlanmamış olmasından kaynaklanıyor. Muhtemelen fonksiyonu çağırdığınız satır, fonksiyonun tanımlandığı satırdan önce geliyor."bu yüzden yularıya taşıdım)

// });

// //! 1-b
// //Bayrak verisinin (src="https://flagcdn.com/16x12/ua.png") devamındaki country koduna erişebilmek için getWeather fonksiyonunu ile yakaladığım değeri await ile yakalayıp, dataya aktarıyorum.
//  const data = await getWeather('Ankara');

//  //datayı yazdırıyorum.(data.sys.country)
//  //küçük harfe çevirmek için.tolowercase kullanıyorum
// // console.log(data.sys.country.toLowerCase());

// //! 2-b
// //Kendisine bir tane kod vermemi istiyor. Bu kodu da buradan->data.sys.country.toLowerCase() alacak.Buradan aldığım veriyi de url'ye aktarıyorum.
// const url = getFlagUrl(data.sys.country.toLowerCase());

// // console.log(url)

// //? Buraya kadar yapılan işlemlerle birbirne bağımlı iki fonksiyon ile arayüzde elde etmem gereken tüm verileri elde etmiş oluyorum. Bu noktadan sonra bana ne lazım?? Artık sayfa yüklendiği anda API'ya istek atmalı, api'dan gelen veri neticesinde bayrak ve hava durumu verilerini elde etmem gerekiyor. Hava durumu verilerini alırken ben inputun gönderilmesini izleyeceğim. Sonra da elde ettiğim veriyi arayüze aktaracağım!! İlk işlemim -> arayüz noktasında formun gönderilmesini izleyeceğim(3)->Bunu da ui.js'de oluşturacağım.

// //! 3-b

// //elements objesinin içindeki formu izlemek izlemek istiyorum(add event list.), izlemek istediğim olay submit olayı, submit olayı tetiklendiğinde ise bir tane fonksiyonu teteiklemeliyim.

// //formlar sayfa yenilemeye neden olduğu için event adında bir parametre (e)alıyor ve preventDef. ile çözüyorum.

// //form gönderildiğinde çalışacak fonksiyon

// elements.form.addEventListener('submit',async (e)=>{
//     //sayfa yenilemesini engelle
//     e.preventDefault()

//     // console.log('form gönderildi.')

//     //form içerisindeki ınput değerine eriş->Yazdığım değeri elde etmem gerekiyor. Bunun için; ilgili eventı(e) konsola yazdırıyorum. Formdan istanbul'u değerini gönderdim ve form gönderildi. bunun içinde de bir tane submitEvent var(konsolda), onun içinde de target var. Gönderen eleman her kimse bunu bana döndürüyor(dizi şeklinde).Bunun içinde  bulunan 0.cı elemana erişiyorum. İnputtan girdiğim city'yi konsolda gördüm bunu da query'ye aktarıyorum.

//     // console.log(e.target[0].value)

//     const query = e.target[0].value.trim();

//                 //!------------8-a-------------
//                 //! Bir şehir adı girmediğimde loader sonsuza dek dönüyor. Çünkü formun gönderildiği noktada sayfa yenilemeyi engelelsin, inputun değerine yani querrye erişsin, loader'ı aktif etsin ve sonrasında hava durumu verilerini alsın gibi bir sıralama yapılmış. Ama ben eğer bir querye sahip değilsem sonraki ksımlar çalışmayacağından(hava durmu verilerini alma vs) loader sonsuza dek dönecek. Bunu nasıl engellerim??Yani aratılan kelime yoksa loader dursun nasıl çözücem bunu? tabiki RETURN ile!!

//                 // Eğer input boş ise fonksiyonu durdur
//                 if (!query) {
//                 alert("Şehir isminin girilmesi zorunludur.Lütfen şehir adı giriniz.");

//                  return;
//                  }

//                 //!-------------8-a--------------



//    //? Bu noktadan sonra ne yapmalıyım? Elde ettiğim input değeri ile api'ya istek atmalıyım. api isteği getWeather fonksiyonunu çalıştırıyorum. Bu fonksiyon benden bir tane city değeri istiyor,bunu query olarak ver. bÖYLECE APİ'ya istek atmış olacağım. Sonra bu bana bir değer dönecek (weatherData) bende bu değeri alıp yöneteceğim. Burada fonksiyonu asenkron şekilde oluşturuyorum.

//              //!----------------------------------------- 6-b ------------------------------------

//              //Loader'ı render et!!Bu fonksiyonu render etmek için 3-b'nin arasında çalıştırdık!!!

//                 showLoader();

//              //!----------------------------------------- 6-b ------------------------------------




// //! 9-b  Hata alma durumlarını yönetebilmek için try-catch yapısı kullanıyorum, erorr renderlayan fonksiyonun doğru çalışacağı yer burası!!burada hata aldım yeniden oluşturyorum!!!(bknz yukarı :)

// try {
//     // Api'dan hava durumu verilerini al
//     const weatherData = await getWeather(query);

//     // Api'dan bayrak verilerini al
//     const flagUrl = getFlagUrl(weatherData.sys.country);

//     // Hava durumu verileri ve bayrağı render et
//     displayWeather(weatherData, flagUrl);

//     // Error'u gizle
//     hideError();
//   } catch (error) {
//     // Eğer hata varsa error fonksiyonunu çalıştır
//     showError();
//   } finally {
//     // Loader'ı gizle
//     hideLoader();
//   }
// });
   

//              //!----------------------------------------- 6-b ------------------------------------

//             //  //Loader'ı gizle
//             //     hideLoader();

//              //!----------------------------------------- 6-b ------------------------------------

//    //Bir de ilgili city'nin country'sinin flag bilgilerini alıyorum
// //    const flagUrl = getFlagUrl(weatherData.sys.country);

// //    console.log(weatherData);
// //    console.log(flagUrl);
//    //? Bu noktadan sonra arayüzü güncellemem gerekiyor, ui.js'e gidiyorum!!!

//    // 4-b burada çalıştırılyor.
// //    displayWeather(weatherData,flagUrl);

//    //?buradan sonra yapılcak ilk adım arayüz noktasında kapsayıcıyı görünür kılmak olacak! bunun için weather container daki hidden ı kaldırmak olacak(displayWeather fonksiyonunun 1.işlevi)


// //! 4-b
// //bU fonksiyon ne zaman çalışşacak?inputtan değere erişilsin, api'ya istek atılsın, veriler alınsın, bayrak verisi gelsin. Bu yüzden bu fonksiyonu "const flagUrl = getFlagUrl(weatherData.sys.country); sonrasına taşıyorum.
// // displayWeather()


// //! 7-b
// //Datalist için optionlar oluşturan fonksiyon

// const createOption = (cities) => {
//     // Dışarıdan verilen şehir dizisini dön ve herbir dizi elemanı için bir option oluştur
//     cities.forEach((city) => {
//       // Her eleman için bir option oluştur
//       const option = document.createElement("option");
  
//       // Optionların value'sunu şehir adı olarak ayarla
//       option.value = city;

//         //?Sıradaki amacım ne? oluşturduğum tüm opitonları html'de ilgili (js ile doldurlacak yazan) yere aktarabilmek. Bunun için de id'sini alıp((turkish-cities) ) elementsin içinde yeni br yapı oluşturuyorum.(ui.js)

//         // Oluşturulan optionları html kısmındaki data-list elemanının içerisine aktar
//     elements.citiesDataList.appendChild(option);
//   });
// };


















// //!DENEMEEEE
// //datalist

// const cities = [
//     "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın",
//     "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum",
//     "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
//     "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
//     "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin",
//     "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
//     "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak",
//     "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır",
//     "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
// ];

// // Datalist öğesini seç
// const datalist = document.getElementById("cities");

// // Tüm şehirleri datalist içine ekleyelim
// cities.forEach(city => {
//     // <option> oluştur
//     const option = document.createElement("option");
//     // Şehir adını ekle
//     option.value = city;
//     // <datalist> içine ekle
//     datalist.appendChild(option);
// });

// //!---------------------------------------------------------------


// //dark-light mode
// const themeToggleBtn = document.getElementById('theme-toggle-btn');
//         themeToggleBtn.addEventListener('click', () => {
//             document.body.classList.toggle('dark-mode');
//             document.body.classList.toggle('light-mode');

//             // İkonu değiştirmek için
//             const icon = themeToggleBtn.querySelector('i');
//             if (document.body.classList.contains('dark-mode')) {
//                 icon.classList.remove('fa-moon');
//                 icon.classList.add('fa-sun');
//             } else {
//                 icon.classList.remove('fa-sun');
//                 icon.classList.add('fa-moon');
//             }
//         });