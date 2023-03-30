'use strict';
const MESS_DATE = new Date(window.mDate);
const MESS_CHECK = 10000;

const SETTING_BG = "settings.background"

const rooms = {
    clean: "/images/BlueyFestBg.png",
    messy: "/images/BlueyFestBgV2.png"
};

let currentRoom = rooms.clean;

const settings = loadSettings();
setBackground(settings.background);

function setBackground(background) {
    document.documentElement.style.setProperty('--background-img',"url("+background+")" )
    localStorage.setItem(SETTING_BG, background);
    currentRoom = background;
}

function loadSettings()
{
    let background = localStorage.getItem(SETTING_BG);
    // at first run there is no data, also user may anytime clear storage
    if (!background)
    {
        background =  rooms.clean;
    }
    return { background: background }
}
function checkRoom() {
    let remaining = (MESS_DATE.getTime() - Date.now()) / 1000;
    if (remaining < 0) {
        console.log("The kids did not clean their room...")
        setBackground(rooms.messy);
        return;
    }

    // Schedule time to check
    setTimeout(checkRoom, MESS_CHECK);
}

if(currentRoom === rooms.clean) {
    checkRoom();
}

