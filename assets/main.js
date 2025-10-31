    // Make all ".win" draggable by their ".titlebar"
function initWindow(){
    document.querySelectorAll('.win-title').forEach((element) => {
  element.addEventListener('mousedown', (event) => {
    let shiftX = event.clientX - element.parentElement.getBoundingClientRect().left;
    let shiftY = event.clientY - element.parentElement.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      element.parentElement.style.left = pageX - shiftX + 'px';
      element.parentElement.style.top = pageY - shiftY + 'px';
    };

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    element.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });

    element.ondragstart = () => false; // Prevent default drag behavior
  });
});

    document.getElementById("desktop-main").onclick = hideMenu;
    document.getElementById("desktop-main").oncontextmenu = rightClick;

}

function createWindow(title = "Aero Window", icon = "assets/unknownapp.png", bodyHTML = "", padding="4px", styleJSON={win: "", title: "", body: "", controls: ""}) {
  // Create the window frame
  const win = document.createElement("div");
  win.className = "win-frame resizable";
  
  win.style.width = "400px";
  win.style.height = "300px";
  win.style.position = "absolute";

  win.setAttribute("style", win.getAttribute("style") + ("" || " " + styleJSON.win));

  win.style.top = Math.random() * 200 + 100 + "px";
  win.style.left = Math.random() * 200 + 100 + "px";
  win.style.zIndex = 1000 + document.querySelectorAll(".win-frame").length;


  const controls = document.createElement("div");
  controls.className = "win-controls";
  controls.innerHTML = "<div class='win-minimize'></div><div class='win-maximize'></div><div class='win-close' onclick='this.parentElement.parentElement.remove();'></div>";

  controls.setAttribute("style", controls.getAttribute("style") + ("" || "; " + styleJSON.controls));
  // Title bar
  const titlebar = document.createElement("div");
  titlebar.className = "win-title";
  titlebar.innerHTML = `<img src="${icon}" alt=""> ${title}`;
  titlebar.setAttribute("style", titlebar.getAttribute("style") + ("" || "; " + styleJSON.title));

  // Body
  const body = document.createElement("div");
  body.className = "win-body";
  body.style.padding = padding;
  body.innerHTML = bodyHTML || `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    <p><button>Windows 7 button example</button></p>
    <p><input type="checkbox" id="cb-${Date.now()}"><label for="cb-${Date.now()}">Windows 7 checkbox example</label></p>
  `;
  body.setAttribute("style", body.getAttribute("style") + ("" || "; " + styleJSON.body));

  // Assemble
  win.appendChild(controls);
  win.appendChild(titlebar);
  win.appendChild(body);
  document.body.appendChild(win);

  // --- Dragging logic (only on title) ---
  let offsetX = 0, offsetY = 0, isDragging = false;
  titlebar.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    console.log("Started dragging");
  });
  // Use document to track mouse outside the titlebar
  document.body.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });
  titlebar.addEventListener("mouseup", (e) => {
    isDragging = false;
    console.log("Stopped dragging");
  });

  // Optional: simple resize (bottom-right corner)

  return win; // so you can store or manipulate it later
}



        function hideMenu() {
            document.getElementById("contextMenu").style.display = "none"
        }

        function rightClick(e) {
            e.preventDefault();

            if (document.getElementById("contextMenu").style.display == "block")
                hideMenu();
            else {
                let menu = document.getElementById("contextMenu")

                menu.style.display = 'block';
                menu.style.left = e.pageX + "px";
                menu.style.top = e.pageY + "px";
            }
        }


function changeDesktopBackground(){
    var imageUrl = prompt("Enter the URL of the new desktop background image:");
    if (imageUrl) {
        document.getElementById('desktop-main').style.backgroundImage = `url('${imageUrl}')`;
    } else {
        alert("No URL provided. Desktop background not changed.");
    }
}
function eMSGgen(){
    var x = prompt("Window title?");
    var y = prompt("Window message?");
    var z = prompt("Error icon URL? (x/i/!/?/{x>/{!>/{V>) (leave blank for default)");
    const errorSoundURL = "assets/sounds/Windows Critical Stop.wav";
    const warningSoundURL = "assets/sounds/Windows Error.wav";
    if(z === "x"){
        z = "assets/atp/status/48/gtk-dialog-error.png";
        const audio = new Audio(errorSoundURL);
        audio.play();
    } else if(z === "i"){
        z = "assets/atp/status/48/gtk-dialog-info.png";
    } else if(z === "!"){
        z = "assets/atp/status/48/gtk-dialog-warning.png";
    } else if(z === "?"){
        z = "assets/atp/status/48/gtk-dialog-question.png";
    } else if(z === "{x>"){
        z = "assets/atp/status/48/security-low.png";
    } else if(z === "{!>"){
        z = "assets/atp/status/48/security-medium.png";
    } else if(z === "{V>"){
        z = "assets/atp/status/48/stock_lock-ok.png";
    } else {
        z = "assets/atp/status/48/gtk-dialog-error.png";
    }
    createWindow(x, null, "<div class='msgbox'><img class='msgbox-icon' src='" + (z || "assets/atp/status/48/gtk-dialog-error.png") + "' alt='Error Icon' /> <span class='msgbox-text'>" + y + "</span></div><div class='msgbox-buttons'><div class='msgbox-buttons-inner'><button onclick='this.parentElement.parentElement.parentElement.parentElement.remove()'>OK</button></div></div>", "4px", {body: "overflow-x: break-word;"});
}
function createHxU(){
    createWindow("HxUnblox Browser", "assets/unknownapp.png", `
        <iframe src="http://www.google.com/" id="hxu" style="width: 100%; height: 100%; frameborder: 0;"></iframe>
    `, "0px")
}
function wslWin(){
    createWindow("Arch Linux (v86)", "assets/atp/apps/16/bash.png", "To be added...", "4px");

}
function newExplorerWindow(dir){
    createWindow("Explorer - " + dir, "assets/atp/apps/16/folder.png", "To be added...", "4px");
}
