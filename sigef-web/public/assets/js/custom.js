// console.log("Hello world")

function counter() {
    var e = document.querySelectorAll(".counter-value");
    function i(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    e &&
      e &&
      Array.from(e).forEach(function (l) {
        !(function e() {
          var n = +l.getAttribute("data-target"),
            t = +l.innerText,
            o = n / 250;
          o < 1 && (o = 1),
            t < n
              ? ((l.innerText = (t + o).toFixed(0)), setTimeout(e, 1))
              : (l.innerText = i(n)),
            i(l.innerText);
        })();
      });
  }
  counter();