// fungsi dijalankan saat halaman sudah ready
var soal = generate();

$(document).ready(function () {
    document.getElementById('ans').innerHTML = soal[2];
    document.getElementById('question').innerHTML = soal[1].join(' ');
    changeColor();
});

function changeColor() {
    // ubah warna background
    let colorLib = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e67e22', '#e74c3c', '#2c3e50'];
    document.body.style.backgroundColor = colorLib[Math.floor(Math.random() * colorLib.length)];
}

function generate() {
    // masukkan jawaban
    let libOp = '+-*';
    let level = document.getElementById('level').innerHTML;
    let res = ['', [], 0]; // jawaban, soal, hasil

    for (let i = 0; i < Math.ceil(level / 5) * 3 - Math.ceil(level / 5) + 1; i++) {
        if (i % 2 === 0) {
            temp = Math.round(Math.random() * 10) + 1;
            res[0] += temp.toString();
            res[1].push(temp);
        } else {
            res[0] += (libOp[Math.round(Math.random() * (libOp.length - 1))]);
            res[1].push('&EmptySmallSquare;');
        }
    }
    // pembulatan 2 angka dibelakang koma bisa dipakai klo udah ada pembagi
    res[2] = Math.round(eval(res[0]) * 100) / 100;

    return res;
}

function insertOp(op) {
    for (let i = 0; i < soal[1].length; i++) {
        if (soal[1][i] === '&EmptySmallSquare;') {
            soal[1][i] = op;
            document.getElementById('question').innerHTML = soal[1].join(' ');
            break;
        }
    }

    if (!soal[1].includes('&EmptySmallSquare;')) {
        let win;

        if (eval(soal[1].join('')) === soal[2]) {
            document.getElementById('win').style.display = "";
            document.getElementById('level-up').style.display = "";
            document.getElementById('alert').style.display = "none";
            document.getElementById('highest-level').style.display = "none";
            document.getElementById('lose').style.display = "none";
            win = true;
        } else {
            document.getElementById('highest-level').innerHTML += document.getElementById('level').innerHTML;
            document.getElementById('lose').style.display = "";
            document.getElementById('alert').style.display = "";
            document.getElementById('highest-level').style.display = "";
            document.getElementById('level-up').style.display = "none";
            document.getElementById('win').style.display = "none";
            win = false;
        }

        // tampilkan modal result sesuai dokumentasi bootstrap
        $('#result').modal('show');

        $('#result').on('hidden.bs.modal', function (e) {
            if (win) {
                // saat menang, naikkan level, generate soal baru, dan ubah background color
                document.getElementById('level').innerHTML++;
                soal = generate();
                document.getElementById('ans').innerHTML = soal[2];
                document.getElementById('question').innerHTML = soal[1].join(' ');
                changeColor();
            } else {
                // auto redirect ke homepage setelah user close pop up jika jawaban salah
                // window.location.href = "index.html";

                document.getElementById('level').innerHTML = 1;
                soal = generate();
                document.getElementById('ans').innerHTML = soal[2];
                document.getElementById('question').innerHTML = soal[1].join(' ');
                changeColor();
            }

            // prevent twice call
            $(this).off('hidden.bs.modal');
        });
    }
}