function ajax(obj) {
    var url = obj.url;
    var method = obj.method;
    var success = obj.success;
    var fail = obj.fail;
    var header = obj.header;
    var data = obj.data;
    var xhr =  new XMLHttpRequest();
    xhr.onreadystatechange = function (ev) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText))
                }
            } else {
                if (fail) {
                    fail(JSON.parse(xhr.responseText))
                } else {
                    alert(xhr.responseText)
                }
            }
        }
    }
    xhr.open(method, url, true);
    if (header) {
        for (var prop in header) {
            xhr.setRequestHeader(prop, header[prop]);
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data ? data : ""));
}
function get(url, success, fail, header) {
    ajax({
        url: url,
        success: success,
        fail: fail,
        header: header,
        method: "GET"
    })
}
function post(url,data, success, fail, header ) {
    ajax({
        url: url,
        success: success,
        fail: fail,
        header: header,
        data: data,
        method: "POST"
    })
}
function maxZIndex() {
    var array = document.querySelectorAll("*");
    var zIndex = 0;
    array.forEach(function (value) {
        var z = window.getComputedStyle(value, null).zIndex;
        if (z != "auto" && z > zIndex) {
            zIndex = z;
        }
    })
    return zIndex;
}
function dialog(element, callback) {
    var time = new Date().getTime();
    if ( !window.dialogs ) {
        window.dialogs = [];
    }
    window.dialogs.push(time);
    var zIndex = maxZIndex();
    var maskDiv = document.createElement("mask");
    maskDiv.classList.add("mask");
    maskDiv.id = time + "mask"
    maskDiv.style.zIndex = zIndex + 1;
    document.body.appendChild(maskDiv);
    var outDiv = document.createElement("div");
    outDiv.classList.add("dialog");
    outDiv.id = time + "div";
    outDiv.style.zIndex = zIndex + 2;
    var closeImg = document.createElement("img");
    closeImg.classList.add("dialog-close");
    closeImg.src = "img/dialog_close.png";
    closeImg.style.zIndex = zIndex + 3;
    outDiv.appendChild(closeImg);
    outDiv.appendChild(element);
    document.body.appendChild(outDiv);
    closeImg.onclick = function () {
        window.dialogs.pop();
        document.body.removeChild(maskDiv);
        document.body.removeChild(outDiv);
        if (callback) {
            callback()
        }
    }
    return time;
}
function closeAllDialog() {
    var time;
    while (time = window.dialogs.pop())  {
        document.body.removeChild(document.getElementById(time + "div"));
        document.body.removeChild(document.getElementById(time + "mask"));
    }
}
function bind(string, data) {
    var props0 = string.match(/{{\w+}}/g);
    var props = [];
    props0.map(function (value) {
        props.push(value.substring(2, value.length - 2))
    })
    var h = string;
    props0.map(function (prop0, index) {
        var v = data[props[index]] == undefined ? "" : data[props[index]];
        do {
            h = h.replace(prop0, v);
        } while (h.match(prop0));
    })
    return h;
}
function currentAccount() {
    return "5be2bea0e3135a3eb748b82c"
}