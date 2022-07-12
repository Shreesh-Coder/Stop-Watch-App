const stopWatch = document.getElementById("stop-watch");
const lapButton = document.getElementById("lap-button");
const startStopButton = 
document.getElementById("start-stop-button");
const lapLists = document.getElementById("lap-list");
const resetButton = document.getElementById("reset-button");
const laps = [];
lapButton.style.display = "none";
resetButton.style.display = "none";

class Time
{
    constructor(mintue, second, millisecond)
    {
        this.mintue = mintue;
        this.second = second;
        this.centisecond = millisecond;
    }
    pad(n)
    {
        return (n < 10) ? `0${n}`: n;
    }
    printTime()
    {
        stopWatch.innerHTML = this.to_string();
    }
    to_string()
    {
        return `${this.pad(this.mintue)}:${this.pad(this.second)}:${this.pad(this.centisecond)}`;
    }
    
}

const time = new Time(0, 0, 0);
time.printTime();

let interval;
startStopButton.onclick = () =>{
    if(startStopButton.innerHTML.toString().trim() === "start")
    {        
        interval = setInterval(timerFun, 10);
        
        startStopButton.innerHTML = "stop";

        lapButton.style.display = "block";
        resetButton.style.display = "block";
    }
    else
    {
        clearInterval(interval);       

        startStopButton.innerHTML = "start";
    }
}

let LapCounter = 0;
lapButton.onclick = () =>{
    const lap = document.createElement("div");
    const lapText = document.createElement("p");
    const lapTime = document.createElement("p");
    
    LapCounter++;
    lapText.innerHTML = `Lap ${LapCounter}`;

    lapTime.innerHTML =  time.to_string();

    lap.appendChild(lapText);
    lap.appendChild(lapTime);

    lapLists.appendChild(lap);    

    laps.push({lapText, lapTime, lap});

    LapStyle(lap, lapTime);
}

function LapStyle(lap, lapTime)
{
    lap.style.display = "flex";
    lap.style.justifyContent = "space-between";
    lap.style.borderTop = "1px solid white";
    lap.style.borderBlockEnd = "1px solid white";

    lapTime.style.padding = "3px";

    if(LapCounter >= 2)
        laps[LapCounter - 1].lap.style.borderTop = "";
}

function timerFun()
{
    time.centisecond++;
    
    if(time.centisecond == 100)
    {
        time.second++;
        time.centisecond = 0;
        if(time.second == 60)
        {
            time.mintue++;
            time.second = 0;
            if(time.mintue == 60)
            {
                time.centisecond = 0;
                time.second = 0;
                time.mintue = 0;
            }
        }
    }

    time.printTime();
}

resetButton.onclick = () =>{
    clearInterval(interval);
    
    time.mintue = 0;
    time.second = 0;
    time.centisecond = 0;

    time.printTime();

    startStopButton.innerHTML = "start";
    LapCounter = 0;

    lapButton.style.display = "none";
    resetButton.style.display = "none";


    laps.forEach((ele) =>{
        ele.lapText.remove(),
        ele.lapTime.remove(),
        ele.lap.remove()
    })
}