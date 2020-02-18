$(function(){
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinutes, timeSecond, timeCentisecond, lapMinutes, lapSecond, lapCentisecond;
    //variables
        //App mode
        //time counter
        //lap counter
        //variable for set Interval
        //Number of Laps
        //minutes, second. centisecond for time and lap
    
    //On App load show start and lap buttons
    hideshowButton("#startbutton","#lapbutton");
    
    //click on startbutton
        //mode on 
        //show stop and lap buttons
        //start counter
    $("#startbutton").click(function(){
        mode = 1;
        hideshowButton("#stopbutton","#lapbutton");
        startAction();
    });
    
    //click on stopbutton
        //show resume and reset button
        //start action
    $("#stopbutton").click(function(){
        hideshowButton("#resumebutton","#resetbutton");
        clearInterval(action);
    });
    
    //click on reset button
        //reload the page
    $("#resetbutton").click(function(){
        location.reload();
    });
    
    //click on resume button
        //start action
    $("#resumebutton").click(function(){
        hideshowButton("#stopbutton","#lapbutton");
        startAction();
    });
    
    //click on lapButton
        //if mode is on
            //stop action
            //resetLap and print lap details
            //start action.
    $("#lapbutton").click(function(){
        if(mode == 1){
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startAction();
        }
    });
    
    //functions
    function hideshowButton(button1,button2){
        $(".control").hide();
        $(button1).show();
        $(button2).show();
    }
    
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 60*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 60*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }
    
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSecond = Math.floor((timeCounter%6000)/100);
        timeCentisecond = (timeCounter%6000)%100;
        $("#timeminutes").text(fomattime(timeMinutes));
        $("#timesecond").text(fomattime(timeSecond));
        $("#timecentisecond").text(fomattime(timeCentisecond));
        
        lapMinutes = Math.floor(lapCounter/6000);
        lapSecond = Math.floor((lapCounter%6000)/100);
        lapCentisecond = (lapCounter%6000)%100;
        $("#lapminutes").text(fomattime(lapMinutes));
        $("#lapsecond").text(fomattime(lapSecond));
        $("#lapcentisecond").text(fomattime(lapCentisecond));
    }
    
    function fomattime(number){
        if(number < 10){
            return "0"+number;
        }else{
            return number;
        }
    }
    
    function addLap(){
        lapNumber ++;
        var myDetailLap = "<div id='laps'>"+"<div id='lapNumber'>Lap" + lapNumber + "</div><div id='lapTime'><span>"+ fomattime(lapMinutes)+"</span>:<span>"+fomattime(lapSecond)+"</span>:<span>"+fomattime(lapCentisecond)+"</span></div>"+"</div>";
        $(myDetailLap).prependTo("#lapcontent");
    }
});