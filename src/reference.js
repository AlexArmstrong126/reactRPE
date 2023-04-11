"use strict";
const rpe_chart = {
    1: {
      10: 100,
      9.5: 97.8,
      9: 95.5,
      8.5: 93.9,
      8: 92.2,
      7.5: 90.7,
      7: 89.2,
      6.5: 87.8,
      6: 86.3,
    },
    2: {
      10: 95.5,
      9.5: 93.9,
      9: 92.2,
      8.5: 90.7,
      8: 89.2,
      7.5: 87.8,
      7: 86.3,
      6.5: 85,
      6: 83.7,
    },
    3: {
      10: 92.2,
      9.5: 90.7,
      9: 89.2,
      8.5: 87.8,
      8: 86.3,
      7.5: 85,
      7: 83.7,
      6.5: 82.4,
      6: 81.1,
    },
    4: {
      10: 89.2,
      9.5: 87.8,
      9: 86.3,
      8.5: 85,
      8: 83.7,
      7.5: 82.4,
      7: 81.1,
      6.5: 79.9,
      6: 78.6,
    },
    5: {
      10: 86.3,
      9.5: 85,
      9: 83.7,
      8.5: 82.4,
      8: 81.1,
      7.5: 79.9,
      7: 78.6,
      6.5: 77.4,
      6: 76.2,
    },
    6: {
      10: 83.7,
      9.5: 82.4,
      9: 81.1,
      8.5: 79.9,
      8: 78.6,
      7.5: 77.4,
      7: 76.2,
      6.5: 75.1,
      6: 73.9,
    },
    7: {
      10: 81.1,
      9.5: 79.9,
      9: 78.6,
      8.5: 77.4,
      8: 76.2,
      7.5: 75.1,
      7: 73.9,
      6.5: 72.3,
      6: 70.7,
    },
    8: {
      10: 78.6,
      9.5: 77.4,
      9: 76.2,
      8.5: 75.1,
      8: 73.9,
      7.5: 72.3,
      7: 70.7,
      6.5: 69.4,
      6: 68,
    },
    9: {
      10: 76.2,
      9.5: 75.1,
      9: 73.9,
      8.5: 72.3,
      8: 70.7,
      7.5: 69.4,
      7: 68,
      6.5: 66.7,
      6: 65.3,
    },
    10: {
      10: 73.9,
      9.5: 72.3,
      9: 70.7,
      8.5: 69.4,
      8: 68,
      7.5: 66.7,
      7: 65.3,
      6.5: 64,
      6: 62.6,
    },
    11: {
      10: 70.7,
      9.5: 69.4,
      9: 68,
      8.5: 66.7,
      8: 65.3,
      7.5: 64,
      7: 62.6,
      6.5: 61.3,
      6: 59.9,
    },
    12: {
      10: 68,
      9.5: 66.7,
      9: 65.3,
      8.5: 64,
      8: 62.6,
      7.5: 61.3,
      7: 59.9,
      6.5: 58.6,
      6: 57.4,
    },
  },
  form = document.getElementById("inputs"),
  e1rm_output = document.getElementById("e1rm_output"),
  weights = [];
let rpe_based = !0;
function onload_chart_page() {
  setup_chart(), (form.elements.compute.onclick = compute_rpe_chart);
}
function setup_chart() {
  const e = document.getElementById("reps_tabs"),
    t = document.getElementById("chart");
  for (let n = 1; n < 13; n++) {
    const o = document.createElement("li");
    o.classList.add("nav-item");
    const s = document.createElement("a");
    (s.innerText = n),
      s.classList.add("nav-link"),
      (s.id = n + "-pill"),
      s.setAttribute("data-toggle", "pill"),
      (s.href = "#" + n + "_div"),
      s.setAttribute("role", "tab"),
      s.setAttribute("aria-controls", n + "_div"),
      1 == n && s.classList.add("active"),
      o.appendChild(s),
      e.appendChild(o);
    const r = document.createElement("div");
    r.classList.add("tab-pane"),
      (r.id = n + "_div"),
      r.setAttribute("role", "tabpanel"),
      r.setAttribute("aria-labelledby", n + "-pill"),
      1 == n && r.classList.add("show", "active");
    for (let e = 10; e > 5.5; e -= 0.5) {
      const t = rpe_chart[n][e],
        o = document.createElement("div");
      o.classList.add("row"), (o.id = n + "_" + e);
      const s = document.createElement("div"),
        a = document.createElement("div"),
        i = document.createElement("div");
      i.setAttribute("percent", t), i.classList.add("d-none"), weights.push(i);
      for (const e of [s, a, i]) e.classList.add("col");
      (s.innerText = e),
        (a.innerText = t + "%"),
        o.appendChild(s),
        o.appendChild(a),
        o.appendChild(i),
        r.append(o);
    }
    t.appendChild(r);
  }
}
function compute_e1rm() {
  const e = form.elements.reps.value,
    t = form.elements.weight.value,
    n = form.elements.rpe.value,
    o = rpe_chart[e][n];
  if ("" === t) return alert("You need to input a weight!"), -1;
  const s = (t / o) * 100;
  return isNaN(s)
    ? (alert("Your weight input must be a number!"), -1)
    : s < 0
    ? (alert("Your weight input must be positive!"), -1)
    : s;
}
function compute_rpe_chart() {
  const e = compute_e1rm();
  if (-1 === e) return;
  const t = form.elements.min_increment.value;
  e1rm_output.innerText = t * Math.round(e / t);
  for (const n of weights)
    (n.innerText = t * Math.round((n.getAttribute("percent") * e) / 100 / t)),
      n.classList.remove("d-none");
  document.getElementById("load_col").classList.remove("d-none"),
    window.scrollBy(0, 100);
}
function onload_backoff_page() {
  const e = document.getElementById("target_%");
  for (let t = 1; t < 41; t++) {
    const n = document.createElement("option");
    (n.value = t),
      (n.innerHTML = `-${t}%`),
      15 === t && (n.selected = "Selected"),
      e.appendChild(n);
  }
  const t = document.getElementById("rpe_based_inputs"),
    n = document.getElementById("%_based_inputs"),
    o = document.getElementById("%_based"),
    s = document.getElementById("rpe_based");
  (t.hidden = !1),
    (n.hidden = !0),
    (s.onclick = function () {
      (rpe_based = !0),
        (t.hidden = !1),
        (n.hidden = !0),
        s.classList.add("active"),
        o.classList.remove("active");
    }),
    (o.onclick = function () {
      (rpe_based = !1),
        (t.hidden = !0),
        (n.hidden = !1),
        s.classList.remove("active"),
        o.classList.add("active");
    }),
    (form.elements.compute.onclick = compute_backoff_sets);
}
function compute_backoff_sets() {
  const e = compute_e1rm();
  if (-1 === e) return;
  let t;
  if (rpe_based) {
    const n = form.elements.target_rpe.value,
      o = form.elements.target_reps.value;
    t = (rpe_chart[o][n] * e) / 100;
  } else {
    const n = form.elements["%_basis_reps"].value,
      o = form.elements["%_basis_rpe"].value;
    t =
      ((100 - form.elements["target_%"].value) / 100) *
      ((rpe_chart[n][o] * e) / 100);
  }
  if (isNaN(e) || isNaN(t))
    return void alert("Your weight input must be a number!");
  if (e < 0 || t < 0) return void alert("Your weight input must be positive!");
  const n = form.elements.min_increment.value;
  (e1rm_output.value = n * Math.round(e / n)),
    (document.getElementById("weight_output").value = n * Math.round(t / n));
}
