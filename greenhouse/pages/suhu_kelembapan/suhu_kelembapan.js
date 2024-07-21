const firebaseConfig = {
  apiKey: "AIzaSyAwkxUgWOAowsEQXy-RZ-9WGKAoUKUPW_g",
  authDomain: "suhudankelembapan-57397.firebaseapp.com",
  databaseURL: "https://suhudankelembapan-57397-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suhudankelembapan-57397",
  storageBucket: "suhudankelembapan-57397.appspot.com",
  messagingSenderId: "866752461556",
  appId: "1:866752461556:web:560390a4256771eecafca1",
  measurementId: "G-Q1GXT7Z7GW",
};

const app = firebase.initializeApp(firebaseConfig);

Setup();

function Setup() {
  let data = [];
  let database = firebase.database();

  database.ref("data_SdanK").on("value", (snap) => {
    // console.log(snap.val());
    snap.forEach(function (res) {
      try {
        let x = res.val().value.split("/");
        let date = res.val().time.split("#");
        data.push({
          waktu: new Date(`${date[0]} ${date[1]}`).getTime(),
          jam: `${date[0]} ${date[1]}`,
          suhu_1: x[0].split("-")[0],
          kelembapan_1: x[0].split("-")[1],
          suhu_2: x[1].split("-")[0],
          kelembapan_2: x[1].split("-")[1],
        });
      } catch (error) {}
    });
    data.sort((a, b) => b.waktu - a.waktu);
    console.log(data);

    setData(data);
    getDataTable(data);
  });
}

function setData(data) {
  if (data[0].suhu_1.length < 6) {
    document.querySelector(".value.suhu_1").innerHTML = parseFloat(data[0].suhu_1).toFixed(1);
  } else {
    document.querySelector(".value.suhu_1").innerHTML = `${data[0].suhu_1[0]}${data[0].suhu_1[1]}`;
  }

  if (data[0].suhu_2.length < 6) {
    document.querySelector(".value.suhu_2").innerHTML = parseFloat(data[0].suhu_2).toFixed(1);
  } else {
    document.querySelector(".value.suhu_2").innerHTML = `${data[0].suhu_2[0]}${data[0].suhu_2[1]}`;
  }

  if (data[0].kelembapan_1.length < 6) {
    document.querySelector(".value.kelembapan_1").innerHTML = parseFloat(data[0].kelembapan_1).toFixed(1);
  } else {
    document.querySelector(".value.kelembapan_1").innerHTML = `${data[0].kelembapan_1[0]}${data[0].kelembapan_1[1]}`;
  }

  if (data[0].kelembapan_2.length < 6) {
    document.querySelector(".value.kelembapan_2").innerHTML = parseFloat(data[0].kelembapan_2).toFixed(1);
  } else {
    document.querySelector(".value.kelembapan_2").innerHTML = `${data[0].kelembapan_2[0]}${data[0].kelembapan_2[1]}`;
  }

  if (data[0].kelembapan_2.length < 6) {
    document.querySelector(".value.kelembapan_2").innerHTML = parseFloat(data[0].kelembapan_2).toFixed(1);
  } else {
    document.querySelector(".value.kelembapan_2").innerHTML = `${data[0].kelembapan_2[0]}${data[0].kelembapan_2[1]}`;
  }

  try {
    if (data[0].durasi_pompa.length < 6) {
      document.querySelector(".value.fuzzy").innerHTML = parseFloat(data[0].durasi_pompa).toFixed(1);
    } else {
      document.querySelector(".value.fuzzy").innerHTML = `${data[0].durasi_pompa[0]}${data[0].durasi_pompa[1]}`;
    }
  } catch (e) {
    document.querySelector(".value.fuzzy").innerHTML = "N";
  }
}

const getDataTable = (data) => {
  let table = [];
  data.map((res, i) => {
    table += updateUI(res, i);
  });
  document.querySelector(".table-row").innerHTML = table;
};

const updateUI = (res, i) => {
  let data = {
    suhu_1: 0,
    suhu_2: 0,
    kelembapan_1: 0,
    kelembapan_2: 0,
    durasi: "N",
    jam: "N",
  };

  try {
    if (res.suhu_1 !== "") {
      data.suhu_1 = res.suhu_1.length < 6 && res.suhu_1.includes(".") ? parseFloat(res.suhu_1).toFixed(1) : `${res.suhu_1[0]}${res.suhu_1[1]}`;
    }
    if (res.suhu_2 !== "") {
      data.suhu_2 = res.suhu_2.length < 6 && res.suhu_2.includes(".") ? parseFloat(res.suhu_2).toFixed(1) : `${res.suhu_2[0]}${res.suhu_2[1]}`;
    }

    if (res.kelembapan_1 !== "") {
      data.kelembapan_1 = res.kelembapan_1.length < 6 && res.kelembapan_1.includes(".") ? parseFloat(res.kelembapan_1).toFixed(1) : `${res.kelembapan_1[0]}${res.kelembapan_1[1]}`;
    }

    if (res.kelembapan_2 !== "") {
      data.kelembapan_2 = res.kelembapan_2.length < 6 && res.kelembapan_2.includes(".") ? parseFloat(res.kelembapan_2).toFixed(1) : `${res.kelembapan_2[0]}${res.kelembapan_2[1]}`;
    }

    if (res.jam !== "") {
      data.jam = res.jam;
    }

    if (res.durasi_pompa !== "") {
      durasi = res.durasi_pompa.length < 6 && res.durasi_pompa.includes(".") ? parseFloat(res.durasi_pompa).toFixed(1) : `${res.durasi_pompa[0]}${res.durasi_pompa[1]}`;
    }
  } catch (e) {}

  return `<tr>
            <td>${i + 1}</td>
            <td>${data.suhu_1}</td>
            <td>${data.suhu_2}</td>
            <td>${data.kelembapan_1}</td>
            <td>${data.kelembapan_2}</td>
            <td>${data.durasi}</td>  
            <td>${data.jam}</td>  
        </tr>`;
};
