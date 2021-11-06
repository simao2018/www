const divTeam = `<a href="display-top.html" class="link-info"><li class="list-group-item">__title__</li></a>`;
let teams = [];
const api_url = "api/tops.json";
const list = document.getElementById("list");


const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};


const fetchApiDone = async () => {
    //await setTeams();

    console.log("🚀 ~ fetch ~ teams", teams)


    if (!teams?.length) {
        await setTeams().then((response) => {
            teams = response;
        });
    }

    teams.forEach((team, i) => {
        const newLi = divTeam.replace("__title__", team.title);
        list.appendChild(htmlToElement(newLi));
    });

};

const fetchLocal = (url) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(new Response(xhr.response, { status: xhr.status }));
        };
        xhr.onerror = function () {
            reject(new TypeError("Local request failed"));
        };
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
    });
};

async function setTeams() {
    return await fetchLocal(api_url).then((response) => response.json());
}

setTeams();


const fetchApiTeams = (url) => {
    fetchLocal(url).then((response) =>
        response.json().then(fetchApiDone)
    );
};



async function addTeam() {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    teams.push({ title: title, description: description });

    const newLi = divTeam.replace("__title__", title);

    list.appendChild(htmlToElement(newLi))

    clearField(['title', 'description']);

    // localStorage.setItem("l_title", title);
    // localStorage.setItem("l_description", description);

    // await setTeams();


    // parseTeam(localStorage.getItem("l_title"), localStorage.getItem("l_description"));
}

const clearField = (fieldValues) => {
    if (!fieldValues?.length)
        return

    fieldValues.forEach(field => {
        document.getElementById(field).value = '';
    });
}

function parseTeam(title, description) {
    console.log("🚀 ~ parseTeam ~ title", title)
    console.log("🚀 ~ parseTeam ~ description", description)
}

function addTopItem() {
    document.getElementById("top-elt-list").style.display = "block";


}

if ("cordova" in window) {
    document.addEventListener("deviceready", function () { fetchApiTeams(api_url) });
} else {
    document.addEventListener("DOMContentLoaded", function () { fetchApiTeams(api_url) });
}
