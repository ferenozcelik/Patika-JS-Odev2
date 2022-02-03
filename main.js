const ulDOM = document.querySelector("#list");
const liElements = document.getElementsByTagName("li"); // var olan tüm maddeler / li elementleri
const taskDOM = document.querySelector("#task"); // input kutusu
const addButton = document.querySelector("#liveToastBtn");

addButton.addEventListener("click", Add); // tıklanınca Add fonksiyonunu çalıştır

// tüm li elementlerini yani maddeleri gez
// her seferinde bir closeButton span oluştur
// span'ın contentini çarpı işareti yap
// span'ın class'ını style.css dosyasındaki "close" class'ı yap
// her li elementine closeButton span'ını ekle
// span'a her tıklandığında Remove fonksiyonunu çalıştır
// li elementlerine her tıklandığında Check fonksiyonunu çalıştır
for (let i = 0; i < liElements.length; i++) {
  let closeButton = document.createElement("span");
  closeButton.textContent = "\u00D7"; // çarpı işareti için
  closeButton.classList.add("close");
  liElements[i].append(closeButton);
  closeButton.onclick = Remove;
  liElements[i].onclick = Check;
}

function Add(event) {
  event.preventDefault();

  if (taskDOM.value.trim()) {
    const liDOM = document.createElement("li"); // yeni madde için li elementi oluştur
    // liDOM.innerHTML = `${taskDOM.value} <span class="close">x</span>`;
    liDOM.innerHTML = taskDOM.value; // elementin texti input texti olsun
    ulDOM.appendChild(liDOM); // ul'ye yeni elementi ekle
    taskDOM.value = ""; // input kutusunu sıfırla
    $(".success").toast("show"); // success kutucuğu fırlat

    // Yeni madde ekledikten sonra check ve closeButton işlemlerini tekrar edip ekliyoruz
    liDOM.onclick = Check;
    let closeButton = document.createElement("span");
    closeButton.textContent = "\u00D7"; // çarpı işareti ekle
    closeButton.classList.add("close"); // class'ını close yap
    closeButton.onclick = Remove; // tıklayınca Remove fonksiyonunu çalıştır
    liDOM.append(closeButton); // elemente close butonunu ekle
  } else {
    taskDOM.value = ""; // input kutusunu sıfırla
    $(".error").toast("show"); // erorr kutucuğu fırlat
  }
}

function Check() {
  this.classList.toggle("checked"); // toggle switch genelde iki şıklı (evet, hayır veya aktif, pasif) gibi durumları belirtmek için kullanılır. burda toggle("checked")'i kullanarak tıklanan maddenin üstünü çiz ve yanına tik işareti koy demiş olduk.
  // checked olmuş maddeye tekrar tıklanırsa unchecked'e dönecek
}

function Remove() {
  this.parentElement.remove(); // closeButton'a her tıklandığında Remove() fonksiyonu çalışıyor.
  // this => closeButton span'i
  // this.parentElement => span'in bağlı olduğu, append() ile eklendiği li elementi
  // ...remove() => li elementini sil
}
