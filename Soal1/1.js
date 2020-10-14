const { table } = require('table')

const data = `91 78 93 57 75 52 99 80 97 62 71 69 72 89 66 104 89 56 45 36
75 79 75 72 72 76 104 74 62 68 97 105 77 65 80 28 102 91 92 30
109 85 97 88 68 83 68 71 69 67 74 62 82 98 101 99 46 65 87 35
79 105 79 69 62 73 82 47 48 53 54 65 65 71 57 57 85 37 75 73
58 100 56 45 37 65 38 39 45 43 44 73 70 56 57 94 83 64 59 52
40 42 45 76 73 78 65 64 68 58 59 60 60 75 71 34 54 57 48 39
36 45 69 76 59 58 81 61 62 38 40 43 59 61 53 65 59 49 43 101
65 46 78 72 74 84 39 49 68 64 72 74 76 81 57 94 89 92 81 79
58 65 47 48 59 73 83 59 62 61 70 71 72 68 69 72 68 64 74 76
40 42 78 73 56 62 64 72 65 66 35 89 65 70 53 50 61 56 49 47
72 78 75 87 85 74 76 68 69 89 85 84 54 57 64 49 69 40 48 60 
45 56 47 48 60 78 60 68 49 47 51 58 38 39 85 83 75 72 71 81
84 75 74 67 68 49 48 57 53 54 65 68 69 64 39 48 51 69 64 79`

const replaceSpacing = data.replace(/\s/g, ',').split(',')
const filteredArray  = replaceSpacing.filter(function (el) { return el != '' })
const normalizeArray = filteredArray.sort(function (a, b) { return a - b })

/*
  1) Menentukan Range (R)
  Yaitu data terbesar dikurangi dengan data terkecil.
  Rumus : Data terbesar-Data terkecil
  => N : 230
*/
const removeData = normalizeArray.slice(30, normalizeArray.length)
console.log(`Jumlah Data : ${removeData.length}`)
console.log(`Isi Data: ${removeData.toString()}\n`)
console.log(`** R = ${removeData[1]}-${removeData[removeData.length-1]}`)

/*
  2) Menentukan banyak kelas yang akan dibuat (K).
  Rumus : K = 1 + 3,33 log N
  => K : banyak kelas yang akan dibuat
  => N : banyaknya data
*/
const findLogData = 1 + (3.33 * 2.36172783602)
console.log(`** K = ${(findLogData).toFixed(0)}`) // -> Wajib dibulatkan keatas +1

/*
  3) Menentukan panjang interval kelas (I)
  Rumus: I = R/K
  => I : Interval kelas
  => R : Range
  => K : Banyak kelas yang akan dibuat

  Data range = (angka terbesar - angka terkecil) & log dibulatkan menjadi 9
*/
const findIntervalData = (removeData[removeData.length-1] - removeData[1]) / 9
console.log(`** I = ${(findIntervalData+1).toFixed(0)}`) // -> Wajib dibulatkan keatas +1

/*
  4) Menentukan ujung bawah/limit bawah kelas yang pertama.
  Ujung bawah/limit bawah kelas yang pertama ditentukan dengan
  cara mengambil data terkecil.
*/
console.log(`** Batas bawah = 45\n`)

/*
  => Kelas = Banyak kelas yang didapat
  => Interval = Range batas bawah - data range
  => Frekuensi = Jumlah banyak data yang muncul antara range interval
  => FK Kurang Dari = Jumlah F1+F2, kemudian hasilnya ditambah F3, dst.. (hitung dari atas)
  => FK Kurang Dari = Jumlah F9+F8, kemudian hasilnya ditambah F7, dst.. (hitung dari bawah)
  => Xi (Titik Tengah) = {
    Tepi atas = batas atas + 0,5
    Tepi bawah = batas bawah - 0,5
    Xi = (tepi atas + tepi bawah) / 2
  }
  => Fi*Xi = Frekuensi Kelas x Titik Tengah
*/
const dataInterval = {
  1: [45, 45, 45, 46, 46, 47, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 50, 51, 51, 52, 52],
  2: [53, 53, 53, 53, 54, 54, 54, 54, 56, 56, 56, 56, 56, 56, 57, 57, 57, 57, 57, 57, 57, 57, 58, 58, 58, 58, 58, 59, 59, 59, 59, 59, 59, 59, 60, 60, 60, 60, 60],
  3: [61, 61, 61, 61, 62, 62, 62, 62, 62, 62, 62, 64, 64, 64, 64, 64, 64, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 66, 66, 67, 67, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68],
  4: [69, 69, 69, 69, 69, 69, 69, 69, 69, 70, 70, 70, 71, 71, 71, 71, 71, 71, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 73, 73, 73, 73, 73, 73, 74, 74, 74, 74, 74, 74, 74, 75, 75, 75, 75, 75, 75, 75, 75, 76, 76, 76, 76, 76, 76],
  5: [77, 78, 78, 78, 78, 78, 78, 79, 79, 79, 79, 79, 80, 80, 81, 81, 81, 81, 82, 82, 83, 83, 83, 83, 84, 84, 84],
  6: [85, 85, 85, 85, 85, 87, 87, 88, 89, 89, 89, 89, 89, 91, 91, 92, 92],
  7: [93, 94, 94, 97, 97, 97, 98, 99, 99, 100],
  8: [101, 101, 102, 104, 104, 105, 105],
  9: [109]
}
// console.log(dataInterval[9].length)

const dataXi = {
  1: [((45-0.5) + (52+0.5)) / 2], // '1': [ 48.5 ]
  2: [((53-0.5) + (60+0.5)) / 2], // '2': [ 56.5 ]
  3: [((61-0.5) + (68+0.5)) / 2], // '3': [ 64.5 ]
  4: [((69-0.5) + (76+0.5)) / 2], // '4': [ 72.5 ]
  5: [((77-0.5) + (84+0.5)) / 2], // '5': [ 80.5 ]
  6: [((85-0.5) + (92+0.5)) / 2], // '6': [ 88.5 ]
  7: [((93-0.5) + (100+0.5)) / 2], // '7': [ 96.5 ]
  8: [((101-0.5) + (108+0.5)) / 2], // '8': [ 104.5 ]
  9: [((109-0.5) + (116+0.5)) / 2] // '9': [ 112.5 ]
}
// console.log(dataXi)

console.log(`Tabel Distribusi Frekuensi`)
const dataTable = [
  ['Kelas',    'Interval',   'Frekuensi',    'FK Kurang Dari',  'FK Lebih Dari',  'Xi',     'Fi*Xi',      'Fi*Xi^2'],
  ['1',        '45-52',      '28',           '28',              '230',            '48.5',   '1.358',      28*Math.pow(48.5,2)],
  ['2',        '53-60',      '39',           '57',              '202',            '56.5',   '2.203,5',    39*Math.pow(56.5,2)],
  ['3',        '61-68',      '46',           '113',             '163',            '64.5',   '2.967',      46*Math.pow(64.5,2)],
  ['4',        '69-76',      '55',           '168',             '117',            '72.5',   '3.987,5',    55*Math.pow(72.5,2)],
  ['5',        '77-84',      '27',           '195',             '62',             '80.5',   '2.173,5',    27*Math.pow(80.5,2)],
  ['6',        '85-92',      '17',           '212',             '35',             '88.5',   '1.504,5',    17*Math.pow(88.5,2)],
  ['7',        '93-100',     '10',           '222',             '18',             '96.5',   '965',        10*Math.pow(96.5,2)],
  ['8',        '101-108',    '7',            '229',             '8',              '104.5',  '731,5',      7*Math.pow(104.5,2)],
  ['9',        '109-116',    '1',            '230',             '1',              '112.5',  '112,5',      1*Math.pow(112.5,2)],
  ['Total',    '',           '230',          '',                '',               '724.5',  '16003',      '1161161.5'],
]
console.log(table(dataTable))
// console.log(48.5+56.5+64.5+72.5+80.5+88.5+96.5+104.5+112.5) // Total Xi
// console.log(1358+2203.5+2967+3987.5+2173.5+1504.5+965+731.5+112.5) // Total Fi*Xi
// console.log(28*Math.pow(48.5,2)+39*Math.pow(56.5,2)+46*Math.pow(64.5,2)+55*Math.pow(72.5,2)+27*Math.pow(80.5,2)+17*Math.pow(88.5,2)+10*Math.pow(96.5,2)+7*Math.pow(104.5,2)+1*Math.pow(112.5,2)) // Total Fi*Xi^2
