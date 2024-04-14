showpassword();

// Logic for POPUPS
function popup(e1) {
    var e = document.getElementById(e1);
    if (e1 == 'change') {
        e.style.top = "34%";
        var i = document.getElementById("search");
        i.style.filter = "blur(8px)";
        var j = document.getElementById("seabtn");
        j.style.filter = "blur(8px)";
    } else if (e1 == 'newpass') {
        e.style.top = "27%";
    }
    else {
        e.style.top = "20%";
    }
    var f = document.getElementById("boddiv");
    f.style.filter = "blur(8px)";
}

// Logic to close popups
function closes(e1) {
    var e = document.getElementById(e1);
    e.style.top = "-123%";
    if (e1 == 'change') {
        var i = document.getElementById("search");
        i.style.filter = "blur(0px)";
        var j = document.getElementById("seabtn");
        j.style.filter = "blur(0px)";
    }
    var f = document.getElementById('boddiv');
    f.style.filter = "blur(0px)";
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("pw").value = "";
    document.getElementById("conpassword").value = "";
    document.getElementById("connewpass").value = "";
    document.getElementById("newpassword").value = "";
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("ercls")[i].innerText = "";
    }
}

// Logic to close search page
function clossea() {
    document.getElementById("seaclose").style.top = "-9%";
    document.getElementById("search").style.fontSize = "5px";
    document.getElementById("search").style.left = "872px";
    document.getElementById("search").style.width = "5px";
    document.getElementById("search").style.border = "none";
    document.getElementById("seabtn").style.left = "872px";
    document.getElementById("search").setAttribute("placeholder", "");
    document.getElementById("res").innerText = "";
    document.getElementById("boddiv").style.filter = "blur(0px)";
    document.getElementById("search").value = "";
    document.getElementsByClassName("rede")[0].innerText = "";
    document.getElementsByClassName("rede")[1].innerText = "";
}


// Save Password in LocalStorage
document.querySelector("#btn").addEventListener("click", (e) => {
    e.preventDefault();
    let passwords = localStorage.getItem("passwords");
    let arr;
    if (isValid() && isExist()) {

        if (passwords == null) {
            arr = [];
            arr.push({ websitename: site.value, username: username.value, password: pw.value });
        } else {
            arr = JSON.parse(localStorage.getItem("passwords"));
            arr.push({ websitename: site.value, username: username.value, password: pw.value });
        }
        localStorage.setItem("passwords", JSON.stringify(arr));
        showpassword();
        closes('outer');
    }
})

// Fill The Table
function showpassword() {
    let tb = document.getElementById("store");
    let data = localStorage.getItem("passwords");
    let str = "";
    let arr = JSON.parse(data);
    if (data == null || arr.length == 0) {
        tb.innerHTML = "No Data To Show";
        tb.style.color = "grey";
        tb.style.textShadow = "none";
    } else {
        tb.style.color = "skyblue";
        tb.style.textShadow = "2px 2px 5px skyblue";
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            str += `<tr>
    <td>${ele.websitename}</td>
    <td>${ele.username}</td>
    <td>${ele.password}</td>
    <td><button id="upd" onclick="changepassword('${ele.websitename}','${ele.username}')"></button></td>
    <td><button id="del" onclick="Del('${ele.websitename}','${ele.username}')"></button></td>
    </tr>`;
        }
        tb.innerHTML = `<tr>
        <td>Website</td>
        <td>Username</td>
        <td>Password</td>
        <td>Edit</td>
        <td>Delete</td>
    </tr>` + str;
    }
}

// Logic to Delete Passwords
function Del(webname, usename) {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let Newarr = arr.filter((e) => {
        return webname != e.websitename || usename != e.username;
    })
    localStorage.setItem("passwords", JSON.stringify(Newarr));
    showpassword();
}

// Logic to Update Passwords
function update(webname, usename) {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let p = newpassword.value;
    let c = connewpass.value;
    // alert(p);
    if (isvalid(p, c)) {

        let Newarr = [];
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            if (e.websitename != webname || e.username != usename) {
                Newarr.push(e);
            } else {
                Newarr.push({ websitename: e.websitename, username: e.username, password: newpassword.value });
            }
        }
        // alert(JSON.stringify(Newarr));
        localStorage.setItem("passwords", JSON.stringify(Newarr));
        showpassword();
        closes('newpass');
    }
}

// Logic to search passwords.
document.querySelector("#seabtn").addEventListener("click", (e) => {
    e.preventDefault();

    var d = document.getElementById("search");
    d.style.border = "2px solid skyblue";
    d.style.width = "546px";
    d.style.fontSize = "16px";
    d.setAttribute("placeholder", "Search");

    var c = document.getElementById("seaclose");
    c.style.top = "27%";

    var f = document.getElementById("boddiv");
    f.style.filter = "blur(15px)";

    d.style.left = "452px";
    var b = document.getElementById("seabtn");
    b.style.left = "986px";

    document.querySelector("#seabtn").addEventListener("click", () => {
        var h = search.value;

        let data = localStorage.getItem("passwords");
        let arr = JSON.parse(data);

        let str = "";
        let tb = document.getElementById("res");
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            if (ele.websitename == h || ele.username == h) {
                str += `<tr>
                <td>${ele.websitename}</td>
                <td>${ele.username}</td>
                <td>${ele.password}</td>
                </tr>`;
            }
        }
        if (str != "") {
            tb.innerHTML = `<tr>
            <td>Website</td>
            <td>Username</td>
            <td>Password</td>
        </tr>` + str;
        tb.style.color="skyblue";
        }
        if(str==""){
        tb.innerHTML = "Not Found";
        tb.style.color="grey";
        }
    })
})


// Logic To check if Entry already exists or not
var prevwn;
var prevun;
function isExist() {
    var webname = site.value;
    var un = username.value;
    prevun = un;
    prevwn = webname;
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    // alert(prevun);
    if (arr == null) return true;
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        if (ele.websitename == webname && ele.username == un) {
            alpop();
            return false;
        }
    }
    return true;
}

function changepassword(wn, un) {
    popup("newpass");
    prevwn = wn;
    prevun = un;
}

document.querySelector("#ch2").addEventListener("click", (e) => {
    e.preventDefault();
    closes('change');
    popup('newpass');
})

document.querySelector("#up").addEventListener("click", (e) => {
    e.preventDefault();
    update(prevwn, prevun);
})

function alpop() {
    closes('outer');
    popup('change');
}

// Logic to validate Submit form
function isValid() {
    var webname = site.value;
    var un = username.value;
    var p = pw.value;
    var b = true;
    if (webname.length == 0) {
        document.getElementById("err1").innerText = "website name is required";
        b = false;
    } else {
        document.getElementById("err1").innerText = " ";
        b = true;
    }
    if (un.length == 0) {
        document.getElementById("err2").innerText = "username is required";
        b = false;
    } else {
        document.getElementById("err2").innerText = "";
        b = true;
    }
    if (p.length == 0) {
        document.getElementById("err3").innerText = "password is required";
        b = false;
    } else {
        document.getElementById("err3").innerText = "";
        b = true;
    }
    var cn = conpassword.value;
    if (cn.length == 0) {
        document.getElementById("err").innerText = "Please confirm your password";
        b = false;
    } else if (p != cn) {
        document.getElementById("err").innerText = "Password doesn't match";
        b = false;
    } else {
        document.getElementById("err").innerText = "";
        b = true;
    }
    return b;
}

// Logic to check validity of new password
function isvalid(p, cn) {
    var b;
    if (p.length == 0) {
        document.getElementById("err6").innerText = "Password is required";
        b = false;
    } else {
        document.getElementById("err6").innerText = "";
        b = true;
    }
    if (cn.length == 0) {
        document.getElementById("err7").innerText = "Please confirm your password";
        b = false;
    } else if (p != cn) {
        document.getElementById("err7").innerText = "Password doesn't match";
        b = false;
    } else {
        document.getElementById("err7").innerText = "";
        b = true;
    }
    return b;
}

// Logic To Show and Hide Password
document.querySelector("#eye").addEventListener("click", (e) => {
    e.preventDefault();
    var p = document.getElementById("pw");
    var c = document.getElementById("eye");
    checkeye(p, c);
})

document.querySelector("#eye2").addEventListener("click", (e) => {
    e.preventDefault();
    checkeye(document.getElementById("conpassword"), document.getElementById("eye2"));
})

document.querySelector("#eye3").addEventListener("click", (e) => {
    e.preventDefault();
    var p = document.getElementById("newpassword");
    var c = document.getElementById("eye3");
    checkeye(p, c);
})

document.querySelector("#eye4").addEventListener("click", (e) => {
    e.preventDefault();
    var p = document.getElementById("connewpass");
    var c = document.getElementById("eye4");
    checkeye(p, c);
})

function checkeye(p, c) {
    var i = c.getAttribute("class");
    if (i == 'closeeye') {
        p.setAttribute("type", "text");
        c.setAttribute("class", "openeye");
    } else {
        p.setAttribute("type", "password");
        c.setAttribute("class", "closeeye");
    }
}
